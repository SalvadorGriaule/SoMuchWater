from sqlmodel import Session, create_engine
from main import Admin, sqlite_url, get_password_hash,connect_args

engine = create_engine(sqlite_url, connect_args=connect_args)

# passer passlib\bcrypt.py version = _bcrypt.__about__.__version__ to _bcrypt.__version__

def seed_admin():
    admin = Admin(username="admin@astro.fr", password=get_password_hash("adminPass"))
    with Session(engine) as session:
        session.add(admin)
        session.commit()

def main():
    seed_admin()

if __name__ == "__main__":
    main()