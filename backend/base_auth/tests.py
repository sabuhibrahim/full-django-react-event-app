from django.test import TestCase, Client
from rest_framework import status
from .models import User, BlackListToken


class AuthTest(TestCase):
    def setUp(self):
        user = User()
        user.email = "loginuser@gmail.com"
        user.full_name = "login user"
        user.is_active = True
        user.set_password("asd123we%y")
        user.save()

    def test_register_user(self):
        c = Client()
        response = c.post(
            "/api/v1/auth/register",
            {
                "email": "test@test.com",
                "full_name": "test testing",
                "password": "Weax#4332d",
                "confirm_password": "Weax#4332d",
            },
        )
        body = response.json()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIsInstance(body, dict)
        self.assertTrue(isinstance(body.get("access"), str))
        self.assertTrue(isinstance(body.get("refresh"), str))

    def test_login_and_logout_user(self):
        c = Client()
        response = c.post(
            "/api/v1/auth/login",
            {
                "email": "loginuser@gmail.com",
                "password": "asd123we%y",
            },
        )

        body = response.json()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(body, dict)
        self.assertTrue(isinstance(body.get("access"), str))
        self.assertTrue(isinstance(body.get("refresh"), str))
        header = f"Bearer {body.get('access')}"
        logout_ressponse = c.post(
            "/api/v1/auth/logout",
            headers={"Authorization": header},
        )
        self.assertEqual(logout_ressponse.status_code, status.HTTP_200_OK)
