from app.models import db, Genre

def seed_genres():
    genre_1 = Genre(genre_name="Synthwave")
    genre_2 = Genre(genre_name="Outrun")
    genre_3 = Genre(genre_name="Vaporwave")

    db.session.add(genre_1)
    db.session.add(genre_2)
    db.session.add(genre_3)

def undo_genres():
    db.session.execute('TRUNCATE genres RESTART IDENTITY CASCADE;')
    db.session.commit()
