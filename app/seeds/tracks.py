from app.models import db, Track

def seed_tracks():
    track_1 = Track(user_id=1, album_id=1, genre_id=1, name="Dream", song_url="dream.mp3", image_url="https://i.imgur.com/OvTKGze.jpg")
    track_2 = Track(user_id=1, album_id=1, genre_id=1, name="Moonlit", song_url="moonlit.mp3", image_url="https://i.imgur.com/OvTKGze.jpg")
    track_3 = Track(user_id=1, album_id=1, genre_id=1, name="The Ride", song_url="theride.mp3", image_url="https://i.imgur.com/OvTKGze.jpg")

    db.session.add(track_1)
    db.session.add(track_2)
    db.session.add(track_3)

    db.session.commit()

def undo_tracks():
    db.session.execute('TRUNCATE tracks RESTART IDENTITY CASCADE;')
    db.session.commit()
