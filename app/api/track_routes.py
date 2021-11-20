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
    new_track = request.json
    track = Track(user_id=new_track["user_id"], genre_id=new_track["genre_id"], album_id=new_track["album_id"],  name=new_track["name"], song_url=new_track["song_url"], image_url=new_track["image_url"])
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

@track_routes.route("/", methods=["POST"])
def search_tracks():
    search = request.json
    search_name = Track.query.filter(Track.name.ilike(f'{search["results"]}%')).all()
    print(search_name)
    return {'search': [Track.to_dict() for Track in search_name]}
