import os

from flask import Blueprint, jsonify, request, Flask
from flask_login import login_required, current_user
from app.models import Comment, db, User
from app.forms import EditCommentForm

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
    return {"list": [singleComment.to_dict() for singleComment in all_track_comments], "combined":find_all}


@comment_routes.route("/list/<int:id>", methods=["GET"])
def get_one_comment(id):
    comment = Comment.query.get(id)
    return {"comment": comment.to_dict()}


@comment_routes.route("/new", methods=["POST"])
@login_required
def create_comment():
    new_comment = request.json
    comment = Comment(user_id=new_comment["user_id"], track_id=new_comment["track_id"], comment=new_comment["comment"])
    db.session.add(comment)
    db.session.commit()
    return{"msg": "comment post ok"}


# @comment_routes.route("/list/<int:comment_id>", methods=["PATCH"])
# @login_required
# def update_comment(comment_id):
#     comment = Comment.query.get(id)
#     form =
#     # comment = Comment.query.filter_by(id=comment_id).get()
#     comment = int(request.json["comment"])
#     db.session.commit();
#     return {"msg": "comment edit ok"}

@comment_routes.route("/list/<int:comment_id>", methods=["PATCH"])
@login_required
def update_comment(comment_id):
    comment = Comment.query.get(comment_id)
    form = EditCommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        # comment.comment = Comment(comment=form.data['comment'])
        comment.comment = form.data["comment"]
        db.session.commit()
        return comment.to_dict()
    return jsonify(form.errors), 400

# @comment_routes.route("/list/<int:comment_id>", methods=["PATCH"])
# @login_required
# def update_comment(comment_id):
#     data = request.json
#     if len(data['comment']) < 1:
#         return {'error': 'Please create a comment'}, 400

#     comment = Comment(user_id=current_user.id, track_id=data["track_id"], comment=data["comment"])
#     db.session.add(comment)
#     db.session.commit()

#     return "Good"

@comment_routes.route("/list/<int:comment_id>", methods=["DELETE"])
@login_required
def delete_comment(comment_id):
    comment = Comment.query.filter_by(id=comment_id).first()
    db.session.delete(comment)
    db.session.commit()
    return comment.to_dict()
