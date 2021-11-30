from flask_wtf import FlaskForm
from wtforms.fields import (StringField, IntegerField)
from wtforms.validators import DataRequired, Length
from app.models import User

class EditTrackForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(), Length(min=1, max=255)])
    genre_id = IntegerField("genre_id", validators=[DataRequired()])
    image_url = StringField("image_url", validators=[Length(min=1, max=250)])
