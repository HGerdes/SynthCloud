from .db import db

class Genre(db.Model):
    __tablename__="genres"
    id = db.Column(db.Integer, primary_key=True)
    genre_name = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "genre_name": self.genre_name,
        }

    albums = db.relationship("Album", back_populates="genres")
    tracks = db.relationship("Track", back_populates="genres")
