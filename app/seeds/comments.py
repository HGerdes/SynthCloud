from app.models import db, Comment

def seed_comments():
    comment_1 = Comment(user_id=1, track_id=1, comment="neat-o")
    comment_2 = Comment(user_id=1, track_id=2, comment="cool")
    comment_3 = Comment(user_id=2, track_id=2, comment="huh")
    comment_4 = Comment(user_id=2, track_id=3, comment="trash")
    comment_5 = Comment(user_id=3, track_id=3, comment="where am i")
    comment_6 = Comment(user_id=3, track_id=1, comment="Help I'm haunted by a korean ghost boy")

    db.session.add(comment_1)
    db.session.add(comment_2)
    db.session.add(comment_3)
    db.session.add(comment_4)
    db.session.add(comment_5)
    db.session.add(comment_6)

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()

