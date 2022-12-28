"""create users_calendars association

Revision ID: eb766f92e5b7
Revises: 4c9d1365cfc5
Create Date: 2022-12-25 13:33:42.017261

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")
# revision identifiers, used by Alembic.
revision = 'eb766f92e5b7'
down_revision = '4c9d1365cfc5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users_calendars',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('calendar_id', sa.Integer(), nullable=False),
    sa.Column('is_displayed', sa.BOOLEAN(), server_default='True', nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['calendar_id'], ['calendars.id'], name='fk_user_calendar_calendar_id'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_user_calendar_user_id'),
    sa.PrimaryKeyConstraint('user_id', 'calendar_id')
    )
    # ### end Alembic commands ###
    if environment == "production":
        op.execute(f"ALTER TABLE users_calendars SET SCHEMA {SCHEMA};")

def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users_calendars')
    # ### end Alembic commands ###