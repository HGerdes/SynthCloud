"""empty message

Revision ID: 9f0a2639d07d
Revises: 4b977f0fefd9
Create Date: 2021-11-17 20:14:13.302860

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9f0a2639d07d'
down_revision = '4b977f0fefd9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tracks', sa.Column('song_url', sa.String(length=255), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('tracks', 'song_url')
    # ### end Alembic commands ###
