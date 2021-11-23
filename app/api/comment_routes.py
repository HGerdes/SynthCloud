from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Comment, User, db

comment_routes = Blueprint("comment", __name__)

@comment_routes.route("/")
def get_all_comments():
    all_comments = Comment.query.all()
    return {"list": [comment.to_dict() for comment in all_comments]}

@comment_routes.route("/<int:track_id>")
def get_comments_for_song(track_id):
    find_all = []
    all_track_comments = Comment.query.filter_by(track_id=track_id).all()
    for comment in all_track_comments:
        user = User.query.get(comment.user_id)
        find_all.append({"comment":comment.to_dict(), "user":user.to_dict()})
    # return {"comments": [comment.to_dict() for comment in all_track_comments]}
    print("##$#$#$#$#$",find_all)
    return {"list": [singleComment.to_dict() for singleComment in all_track_comments], "combined":find_all}

@comment_routes.route("/<int:track_id>", methods=["POST"])
def create_comment():
    new_comment = request.json
    comment = Comment(user_id=new_comment["user_id"], track_id=new_comment["track_id"], comment=new_comment["comment"])
    db.session.add(comment)
    db.session.commit()
    return{"msg": "comment post ok"}

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
