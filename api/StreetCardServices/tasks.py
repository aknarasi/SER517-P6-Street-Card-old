# https://docs.celeryproject.org/en/stable/django/first-steps-with-django.html
# Email: G4k97mdauSjxpOm5VMK17llS9bN7LvyP
# non-email: vP184DLE6D6zSL97q1YydUfFXUVqnFK3
# celery -A api worker -l info


from celery import shared_task
from time import sleep

from django.core.mail import send_mail
from django.conf import settings

# Test Method
# deleteMe Later
@shared_task
def sleeper(duration):
    print("IN SLEEPER")
    sleep(duration)

# @param message String containing information on appointment.
# @param title Title of the email, gonna hardcode it to reminder.
# @param sender: Sender Email address
# @param recipient: List of addressses to get the email (in most cases should be just 1)
# As this is a demo we have currently set up using Gmail, but as the scope gets larger you might want to migrate to 
# a better service such as AmazonSES.
@shared_task
def send_email_task(message, title, sender, recipient):
    send_mail(subject=title, 
              message=message,
              from_email=sender, 
              recipient_list=recipient,
              fail_silently=False)    