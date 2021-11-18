from .db import db

class Album(db.Model):
    __tablename__="albums"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    genre_id = db.Column(db.Integer, db.ForeignKey("genres.id"), nullable=False)
    album_name = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(255))

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "genre_id": self.genre_id,
            "album_name": self.album_name,
            "image": self.image
        }

    users = db.relationship("User", back_populates="albums")
    genres = db.relationship("Genre", back_populates="albums")
    tracks = db.relationship("Track", back_populates="albums")
