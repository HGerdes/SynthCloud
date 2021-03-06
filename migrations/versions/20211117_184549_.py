"""empty message

Revision ID: 4b977f0fefd9
Revises: 3c7cb3c8d7f5
Create Date: 2021-11-17 18:45:49.982843

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4b977f0fefd9'
down_revision = '3c7cb3c8d7f5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('genres',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('genre_name', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_foreign_key(None, 'albums', 'genres', ['genre_id'], ['id'])
    op.create_foreign_key(None, 'albums', 'users', ['user_id'], ['id'])
    op.add_column('comments', sa.Column('track_id', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'comments', 'tracks', ['track_id'], ['id'])
    op.create_foreign_key(None, 'comments', 'users', ['user_id'], ['id'])
    op.drop_column('comments', 'song_id')
    op.create_foreign_key(None, 'tracks', 'users', ['user_id'], ['id'])
    op.create_foreign_key(None, 'tracks', 'albums', ['album_id'], ['id'])
    op.create_foreign_key(None, 'tracks', 'genres', ['genre_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'tracks', type_='foreignkey')
    op.drop_constraint(None, 'tracks', type_='foreignkey')
    op.drop_constraint(None, 'tracks', type_='foreignkey')
    op.add_column('comments', sa.Column('song_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'comments', type_='foreignkey')
    op.drop_constraint(None, 'comments', type_='foreignkey')
    op.drop_column('comments', 'track_id')
    op.drop_constraint(None, 'albums', type_='foreignkey')
    op.drop_constraint(None, 'albums', type_='foreignkey')
    op.drop_table('genres')
    # ### end Alembic commands ###
