from .db import db

class Track(db.Model):
    __tablename__="tracks"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey("albums.id"), nullable=False)
    genre_id = db.Column(db.Integer, db.ForeignKey("genres.id"), nullable=False)
    name = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            'album_id': self.album_id,
            'genre_id': self.genre_id,
            'name': self.name,
        }

    users = db.relationship("User", back_populates="tracks")
    albums = db.relationship("Album", back_populates="tracks")
    genres = db.relationship("Genre", back_populates="tracks")
    comments = db.relationship("Comment", back_populates="tracks")
