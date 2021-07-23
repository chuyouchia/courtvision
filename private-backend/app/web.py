import os
import json
import tornado.ioloop
import tornado.web

from base_web import BaseHandler

class MainHandler(BaseHandler):
    async def get(self):
        self.write("Hello, world")

class YoutubeHandler(BaseHandler):
    async def get(self):
        test = self.cget_argument("test")
        print(test)
        self.write("Hello, Youtube API here")



def make_app():
    return tornado.web.Application([
        (r"/youtube", YoutubeHandler),
        (r"/", MainHandler),
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    main_loop = tornado.ioloop.IOLoop.instance()
    main_loop.start()