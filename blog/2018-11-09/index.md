---
date: "2018-09-11"
title: "Lambda Labs: Week 1"
category: "Lambda School"
tags:
  [
    "Lambda Labs",
    "Django",
    "Django REST Framework",
    "RESTful API",
    "JSON Web Token",
    "Authentication",
  ]
---

# Accomplishments

**[View this week's contribution graph here!](https://github.com/Lambda-School-Labs/Labs8-JobMatcher/graphs/contributors?from=2018-11-04&to=2018-11-10&type=c)**

This week, our team selected and implemented our tech stack for JobMatcher:

- Application and Data

  - Client

        - Javascript Framework → **React**

        - UI Kit → **reactstrap (Bootstrap)**

        - CSS-in-JS → **styled-components**

        - State Management → **Redux.js**

  - Server

        - Python Framework → **Django**

            - RESTful API → **Django REST Framework**

    - Database

      - Development Database → **SQLite**

      - Deployment Database → **PostgreSQL**

- Utilities

  - Deployment

        - Client Deployment → **Netlify**

        - Server Deployment → **Heroku**

        - Database Deployment → **Heroku Postgres**

  - Testing

        - Continuous Integration → **Travis CI**

After overcoming the initial challenges of working with a brand new team, we set up continuous deployment of our client and server, with user account functionality!

# Tasks Pulled

## Client

### Create React App

- **[GitHub](https://github.com/Lambda-School-Labs/Labs8-JobMatcher/pull/2)**
- **[Trello](https://trello.com/c/zJ4rOrR5/11-frontend-via-cra)**

### Netlify redirects

- **[GitHub](https://github.com/Lambda-School-Labs/Labs8-JobMatcher/pull/21)**
- **[Trello](https://trello.com/c/L3Z0Gx7L/47-netlify-deploy-broken)**

### SignUp component

- **[GitHub](https://github.com/Lambda-School-Labs/Labs8-JobMatcher/pull/13)**
- **[Trello](https://trello.com/c/qDmpDhw5/1-create-user-accounts)**

## Server

### Travis CI

- **[GitHub](https://github.com/Lambda-School-Labs/Labs8-JobMatcher/pull/7)**
- **[Trello](https://trello.com/c/AzspvWTu/6-add-a-ci)**

### JWT Authentication

- **[GitHub](https://github.com/Lambda-School-Labs/Labs8-JobMatcher/pull/17)**
- **[Trello](https://trello.com/c/qDmpDhw5/1-create-user-accounts)**

# Detailed Analysis

Let's take a deeper look at JWT Authentication with Django. First, we install the necessary packages in the Django project:

- `djangorestframework` Web APIs for Django, made easy.

- `djangorestframework-jwt` JSON Web Token based authentication for Django REST framework

- `django-cors-headers` django-cors-headers is a Django application for handling the server headers required for Cross-Origin Resource Sharing (CORS).

```
pipenv install djangorestframework
pipenv install djangorestframework-jwt
pipenv install django-cors-headers
```

Next, we add the package configurations to `settings.py` in the Django project:

- Add `'rest_framework'` and `'corsheaders'` to `INSTALLED_APPS`

- Add `'corsheaders.middleware.CorsMiddleware'` to `MIDDLEWARE` above the already existing `'django.middleware.common.CommonMiddleware'`

- Add `REST_FRAMEWORK` and include the customized default settings that will require a request to be authenticated before it is further processed as well as the authentication schemes that the DRF will attempt.

- Add `CORS_ORIGIN_WHITELIST` and include the domains that the client requests will be coming from.

```python
    INSTALLED_APPS = [
        # ...
        'rest_framework',
        'corsheaders',
    ]

    MIDDLEWARE = [
        # ...
        'corsheaders.middleware.CorsMiddleware', # Note that this needs to be placed above CommonMiddleware
        'django.middleware.common.CommonMiddleware', # This should already exist
        # ...
    ]

    REST_FRAMEWORK = {
        'DEFAULT_PERMISSION_CLASSES': (
            'rest_framework.permissions.IsAuthenticated',
        ),
        'DEFAULT_AUTHENTICATION_CLASSES': (
            'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
            'rest_framework.authentication.SessionAuthentication',
            'rest_framework.authentication.BasicAuthentication',
        ),
    }

    CORS_ORIGIN_WHITELIST = (
        'localhost:3000',
    )
```

Next, we can add the following view from `rest_framework_jwt` to `urls.py` in the Django project that will render a form that will return the JWT upon successful sign in:

```python
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    # ...
    path('jwt-token/', obtain_jwt_token)
]
```

Run the server and head over to http://localhost:8000/jwt-token/ to check it out!

[Source](https://medium.com/@dakota.lillie/django-react-jwt-authentication-5015ee00ef9a)

# Milestone Reflections

Working on a new team in software is like eating vegetables for the first time, at first it's uncomfortable, but it's good for you in the long term and becomes enjoyable sooner rather than later.

Luckily for our team however, we were able to quickly establish clear communication which has lead us to rally around our common objectives.

A challenge we are facing, however, is in the constant seeking of consensus that might slow us down as a team if left unchecked.

To optimize our efforts, we are exploring ways to more effectively split up the responsibility and ownership of duties while maintaining cooperation.

None of this would have been possible without the foundation of clear communication and for that I am blessed to be part of this team!

**[Visit our client application here!](https://jobmatcher.netlify.com)**

**[Visit our server application here!](https://django-deploy-heroku-backend.herokuapp.com/api/v1)**

---
