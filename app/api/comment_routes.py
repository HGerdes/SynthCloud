from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Comment, db

comment_routes = Blueprint("comment", __name__)

@comment_routes.route("/")
def get_all_comments():
    all_comments = Comment.query.all()
    return {"list": [comment.to_dict() for comment in all_comments]}

@comment_routes.route("/<int:track_id>")
def get_comments_for_song(id):
    all_track_comments = Comment.query.filter_by(track_id=track_id)
    return {"comments": [comment.to_dict() for comment in all_track_comments]}

@comment_routes.route("/<int:track_id>", methods=["POST"])
def create_comment():
    new_comment = request.json
    comment = Comment(user_id=new_comment["user_id"], track_id=new_comment["track_id"], comment=new_comment["comment"])
    db.session.add(comment)
    db.session.commit()
    return["msg": "comment post ok"]

@comment_routes.route("/<int:id>/update)", methods=["PUT"])
def update_comment(comment_id):
    comment = Comment.query.filter_by(id=comment_id).first()
    comment.comment = request.json["comment"]
    db.session.commit();
    return {"msg": "comment edit ok"}

@comment_routes.route("<int:comment_id>/delete", methods=["DELETE"])
def delete_comment(comment_id):
    Comment.query.filter_by(id=comment_id).delete()
    db.session.commmit()
    return {"msg": "comment delete ok"}
