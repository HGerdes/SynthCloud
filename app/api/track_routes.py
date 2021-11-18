from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Track, db

track_routes = Blueprint("track", __name__)

@track_routes.route("/")
def get_all_tracks():
    all_tracks = Track.query.all()
    return {"list": [singleTrack.to_dict() for singleTrack in all_tracks]}

@track_routes.route("/<int:id>", methods=["GET"])
def getOneTrack(id):
    oneTrack = Track.query.get(id)
    trackDic = oneTrack.to_dict()
    return {"k":[oneTrack.to_dict()]}

@track_routes.route("/new", methods=["POST"])
def addTrack():
    new_track = request.jsonify
    track = Track(user_id=data["user_id"], album_id=data["album_id"], genre_id=data["genre_id"], name=data["name"])
    db.session.add(track)
    db.session.commit()
    return {"msg": "ok"}

@track_routes.route("/<int:id>/update", methods=["PUT"])
def updateTrack(track_id):
    track = Track.query.filter_by(id=track_id).first()
    track.name = data["name"]
    track.genre = data["genre"]
    db.session.commit()
    return track.to_dict()

@track_routes.route("/<int:id>/delete", methods=["DELETE"])
def remove_track(track_id):
    track = Track.query.filter_by(id=track_id).first()
    db.session.delete(track)
    db.session.commit()
    return track.to_dict()
