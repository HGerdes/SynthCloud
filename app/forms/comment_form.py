from flask_wtf import FlaskForm
from wtforms import StringField, TextField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

def editCommentForm(FlaskForm):
    # Checking if password matches
    comment=TextField("comment")
