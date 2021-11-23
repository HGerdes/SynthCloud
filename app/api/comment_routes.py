from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Comment, db

comment_routes = Blueprint("comment", __name__)

@comment_routes.route("/")
def get_all_comments():
    all_comments = Comment.query.all()
    return {"list": [comment.to_dict() for comment in all_comments]}
