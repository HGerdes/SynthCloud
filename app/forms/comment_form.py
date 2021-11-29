from flask_wtf import FlaskForm
from wtforms.fields import (StringField)
from wtforms.validators import DataRequired, Length
from app.models import User

class EditCommentForm(FlaskForm):
    comment = StringField("Comment", validators=[DataRequired()])
