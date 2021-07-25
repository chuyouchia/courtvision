import os
import json
import aiopg
import os.path
import psycopg2

from tornado.ioloop import IOLoop
from tornado.web import Application
from tornado.options import define, options
from tornado.locks import Event

from handlers import *

class CustomApplication(Application):
    def __init__(self, db):
        self.db = db
        handlers = [
            (r"/", HomeHandler),
            (r"/main", MainHandler),
            (r"/youtube", YoutubeHandler),
            (r"/archive", ArchiveHandler),
            (r"/entry/([^/]+)", EntryHandler),
        ]
        settings = dict(
            blog_title="Tornado Blog",
            template_path=os.path.join(os.path.dirname(__file__), "templates"),
            static_path=os.path.join(os.path.dirname(__file__), "static"),
            xsrf_cookies=True,
            cookie_secret="__TODO:_GENERATE_YOUR_OWN_RANDOM_VALUE_HERE__",
            login_url="__TODO:CREATE_LOGIN_URL__",
            debug=True,
        )
        super().__init__(handlers, **settings)


async def maybe_create_tables(db):
    try:
        with (await db.cursor()) as cur:
            await cur.execute("SELECT COUNT(*) FROM entries LIMIT 1")
            await cur.fetchone()
    except psycopg2.ProgrammingError as error:
        print("Error while connecting to PostgreSQL", error)
        with open("schema_blog.sql") as f:
            schema = f.read()
        with (await db.cursor()) as cur:
            await cur.execute(schema)

define("port", default=8888, help="run on the given port", type=int)
#note that we are using the localhost IP adress and the port number -> even if fail over, if same host still connects
define("db_host", default="127.0.0.1", help="blog database host")
define("db_port", default=5432, help="blog database port")
define("db_database", default="app", help="blog database name")
define("db_user", default="postgres", help="blog database user")
define("db_password", default="supersecretpassword", help="blog database password")

async def main_app():
    tornado.options.parse_command_line()

    # Create the global connection pool.
    async with aiopg.create_pool(
        host=options.db_host,
        port=options.db_port,
        user=options.db_user,
        password=options.db_password,
        dbname=options.db_database,
    ) as db:
        await maybe_create_tables(db)
        app = CustomApplication(db)
        app.listen(options.port)

        # In this demo the server will simply run until interrupted
        # with Ctrl-C, but if you want to shut down more gracefully,
        # call shutdown_event.set().
        shutdown_event = Event()
        await shutdown_event.wait()

if __name__ == "__main__":
    main_loop = IOLoop.current().run_sync(main_app)
