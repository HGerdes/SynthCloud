from flask.cli import AppGroup
from .users import seed_users, undo_users
from .albums import seed_albums, undo_albums
from .comments import seed_comments, undo_comments
from .tracks import seed_tracks, undo_tracks
from .genres import seed_genres, undo_genres

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_genres()
    seed_albums()
    seed_comments()
    seed_tracks()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_genres()
    undo_albums()
    undo_comments()
    undo_tracks()
    # Add other undo functions here
