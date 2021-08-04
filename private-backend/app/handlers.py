from base_web import BaseHandler
import tornado.web
import logging

class MainHandler(BaseHandler):
    async def get(self):
        self.write("Hello, world")

class YoutubeHandler(BaseHandler):
    async def get(self):
        test = self.cget_argument("test")
        print(test)
        self.write("Hello, Youtube API here")

class ImageHandler(BaseHandler):
    async def get(self):
        test = self.cget_argument("test")
        print(test)
        self.write("Send back Image here")

    async def post(self):
        test = self.cget_argument("test")
        print(test)
        self.write("Posted Image to Database")

class HomeHandler(BaseHandler):
    async def get(self):
        entries = await self.query(
            "SELECT * FROM entries ORDER BY published DESC LIMIT 5"
        )
        print(entries)

class EntryHandler(BaseHandler):
    async def get(self, slug):
        entry = await self.queryone("SELECT * FROM entries WHERE slug = %s", slug)
        if not entry:
            raise tornado.web.HTTPError(404)
        print(entry)

class ArchiveHandler(BaseHandler):
    async def get(self):
        entries = await self.query("SELECT * FROM entries ORDER BY published DESC")
        print(entries)

class POSTImageHandler(BaseHandler):
    async def post(self):
        for field_name, files in self.request.files.items():
            for info in files:
                filename, content_type = info["filename"], info["content_type"]
                body = info["body"]
                logging.info(
                    'POST "%s" "%s" %d bytes', filename, content_type, len(body)
                )
        #add CORS header, check if it helps in allowing the resource to be shared
        self.set_header("Access-Control-Allow-Origin", "*")
        self.write_json({"response": "OK"})
