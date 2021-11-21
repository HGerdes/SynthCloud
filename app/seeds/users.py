from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    mitchMurder = User(
        username='mitchmurder', email='mm@aa.io', password='password')
    kalax = User(
        username='kalax', email='kalax@aa.io', password='password')
    timecop1983 = User(
        username='timecop1983', email='timecop1983@aa.io', password='password')
    VaporwaveGuy = User(
        username='VaporwaveGuy', email='vg@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(bobbie)
    db.session.add(mitchMurder)
    db.session.add(kalax)
    db.session.add(timecop1983)
    db.session.add(VaporwaveGuy)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
