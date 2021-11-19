from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Genre, db

genre_routes = Blueprint("genre", __name__)

@genre_routes.route("/")
def get_all_genres():
    all_genres = Genre.query.all()
    return {"list": [singleGenre.to_dict() for singleGenre in all_genres]}
