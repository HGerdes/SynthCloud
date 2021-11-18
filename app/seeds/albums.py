from app.models import db, Album

def seed_albums():
    album_1 = Album(user_id=1, genre_id=1, album_name="Album 1", image="a1.png")
    album_2 = Album(user_id=2, genre_id=2, album_name="Album 2", image="a2.png")
    album_3 = Album(user_id=3, genre_id=3, album_name="Album 3", image="a3.png")

    db.session.add(album_1)
    db.session.add(album_2)
    db.session.add(album_3)
    db.session.commit()

def undo_albums():
    db.session.execute('TRUNCATE albums RESTART IDENTITY CASCADE;')
    db.session.commit()
