from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Album, db

album_routes = Blueprint("album", __name__)

@album_routes.route("/")
def get_all_albums():
    all_albums = Album.query.all()
    return {"list": [singleAlbum.to_dict() for singleAlbum in all_albums]}
