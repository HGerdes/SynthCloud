from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Track, db, User

track_routes = Blueprint("track", __name__)

@track_routes.route("/")
def get_all_tracks():
    all_tracks = Track.query.all()
    find_all = []
    for track in all_tracks:
        user = User.query.get(track.user_id)
        find_all.append({"track":track.to_dict(), "user":user.to_dict()})
    return {"list": [singleTrack.to_dict() for singleTrack in all_tracks], "combined": find_all}

@track_routes.route("/<int:id>")
def getOneTrack(id):
    oneTrack = Track.query.get(id)
    find_one = []
    user = User.query.get(oneTrack.user_id)
    find_one.append({"track":oneTrack.to_dict(), "user":user.to_dict()})
    return {"combined":find_one}
    # return oneTrack.to_dict()

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
    return {'search': [Track.to_dict() for Track in search_name]}

@track_routes.route("/artist", methods=["GET"])
def get_track_artist():
    artists = User.query.all()
    print("!!!!!!!", artists)
    return {"list": [artist.to_dict() for artist in artists]}
