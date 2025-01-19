from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    SECRET_KEY=os.getenv("APP_SECRET_KEY")

def test():
    print(os.getenv("APP_SECRET_KEY"))

if __name__ == '__main__':
    test()
    