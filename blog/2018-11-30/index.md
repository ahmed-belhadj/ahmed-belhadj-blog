---
date: "2018-30-11"
title: "Lambda Labs: Week 3"
category: "Lambda School"
tags: ["Lambda Labs"]
---

# Accomplishments

**[View this week's whiteboard interview here!](https://youtu.be/YmjnWucx1F8)**

**[View this week's contribution graph here!](https://github.com/Lambda-School-Labs/Labs8-JobMatcher/graphs/contributors?from=2018-11-25&to=2018-12-01&type=c)**

This week, we worked on delivering a feature complete JobMatcher.

We worked to apply an appropriate responsive design to ensure that the features of JobMatcher can be accessed regardless of the user’s device. We also worked to interpret the wireframe to deliver all features in the design specification.

# Tasks Pulled

## Client

### "Confirm before spending" Modal

- **[GitHub](https://github.com/Lambda-School-Labs/Labs8-JobMatcher/pull/78)**
- **[Trello]()**

### Updated NavBar to show users' respective balance metrics

- **[GitHub](https://github.com/Lambda-School-Labs/Labs8-JobMatcher/pull/77/commits/3f10071a7adbd6ea7a8a457b27ac711569eb8900)**
- **[Trello]()**

### Connect Billing to Redux

- **[GitHub](https://github.com/Lambda-School-Labs/Labs8-JobMatcher/pull/77/commits/60c7ce2e8a6e8143a46b3bf47e19db4760b2f103)**
- **[Trello]()**

## Server

### Add "charge" endpoint

- **[GitHub](https://github.com/Lambda-School-Labs/Labs8-JobMatcher/pull/64)**
- **[Trello]()**

### Added credits, free_apps, free_calls and postings to Profile models and serializers

- **[GitHub](https://github.com/Lambda-School-Labs/Labs8-JobMatcher/pull/77/commits/9b8d4be82482c0f0c4c6dc1f097059b9752a624e)**
- **[Trello]()**

# Detailed Analysis

Let's take a deeper look at implementing Stripe with React:

- We used Stripe Elements, Stripe's pre-built UI components, to create a payment form that securely collects our customer’s card information without requiring us to handle sensitive card data. The card details are then converted to a representative Token that we can safely send to our server.

- To use Stripe Elements in out React application, we can use the react-stripe-elements library. It wraps the Elements components inside of React components that we can embed in our application, directly into our JSX.

To install our dependencies, we install the `react-stripe-elements` library from yarn:

```
yarn add react-stripe-elements
```

Next, we open `public/index.html` and add a `script` tag that loads the `Stripe.js` library in the existing `head` tag.

This library is responsible for communicating with Stripe and performing tokenization. It must be available in the page in order for `react-stripe-elements` to work correctly. For PCI compliance purposes, we must load `Stripe.js` directly from Stripe’s servers at runtime - we can’t install it from npm or bundle it into our application like a conventional dependency:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta name="theme-color" content="#000000" />

    <script src="https://js.stripe.com/v3/"></script>
    ...
  </head>
</html>
```

To create the payment form component, we create a `src/CheckoutForm.js` file and add the following:

- `CardElement` - this component imported from `react-stripe-elements` creates a “card” type element that mounts on the page when the component renders. The `CardElement` includes inputs for all of the major card fields: the card number, the expiration date, and the CVC. To display those inputs separately, we can use other Element components provided by the library.

- `CheckoutForm` - this class defines a component that displays a `CardElement` and a `button` for completing the purchase. The `button`’s click event is wired to the submit method, which is left blank for now—the next step we'll make the submit method tokenize card data and send it to the server.

- `injectStripe`- this function wraps the component, creating a new component with an injected stripe prop, which contains a Stripe object. We must use the wrapped component in our application instead of the original `CheckoutForm`.

```javascript
import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    // User clicked submit
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
```

In our `src/Billing.js` component, we add the following:

- `CheckoutForm` - the component we just created.

- `StripeProvider`- this initializes Stripe and passes in our publishable key. It’s equivalent to creating a Stripe instance with `Stripe.js`.

- `Elements` - this component, which encloses the wrapped checkout form, creates an `Elements` group. When you we multiple `Elements` components instead of the combined `CardElement`, the `Elements` group indicates which ones are related. Note that `Elements` must contain the component that you wrapped with `injectStripe`, we cannot put `Elements` inside of the component that you wrap with `injectStripe`.

```javascript
import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm";

class Billing extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_cBTAEriVzEf6Qiniho2pKzuj">
        <div className="example">
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default Billing;
```

Next, we create a token to securely transmit card information. At this point, the application is capable of displaying a card entry form. The next step is adding functionality to the `CheckoutForm` component’s `submit` method so that clicking the `Purchase` button tokenizes the card information and sends it to our server:

- In the `submit` method of `CheckoutForm`, we tokenize the card information by invoking `createToken` in `props.stripe` . `props.stripe` is available inside the component due to the use of `injectStripe` in the previous step.

- Next, we send the token to your server. Here, we send the token ID in the body of a `POST` request with the browser `Fetch API`:

```javascript
async submit(ev) {
  let {token} = await this.props.stripe.createToken({name: "Name"});
  let response = await fetch("/charge", {
    method: "POST",
    headers: {"Content-Type": "text/plain"},
    body: token.id
  });

  if (response.ok) console.log("Purchase Complete!")
}
```

In our application, we should inform the customer that the charge completed. In the `CheckoutForm.js` file, we add a property to the component’s `state` and use it to make the `render` function conditionally display a message when the purchase is complete:

```javascript
constructor(props) {
  super(props);
  this.state = {complete: false};
  this.submit = this.submit.bind(this);
}

...

async submit(ev) {
  ...

  if (response.ok) this.setState({complete: true});
}

render() {
  if (this.state.complete) return <h1>Purchase Complete</h1>;

  return (
    <div className="checkout">
      <p>Would you like to complete the purchase?</p>
      <CardElement />
      <button onClick={this.submit}>Send</button>
    </div>
  );
}
```

Our React application is now ready to securely send tokenized card information to our server!

**[Source](https://stripe.com/docs/recipes/elements-react)**

# Milestone Reflections

As a part of your journal entry, write ¼ to ½ a page reflecting on your experiences working with a team to convert a disparate set of components into a single, cohesive, and complete product. Describe the challenges you faced and the steps you took to overcome them.

As a group, demonstrate that you project has implemented every feature in the specification. Bugs can be present, and a rough experiences is expected.

List each major feature in your specification and provide a link to where that feature is implemented

**[Visit our client application here!](https://job-matcher-stage.netlify.com/)**

**[Visit our server application here!](https://jobmatcher-api-stage-pr-92.herokuapp.com/docs/)**

---
