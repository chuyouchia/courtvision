import os
from moviepy import editor
from youtube_dl import YoutubeDL
import uuid


def my_hook(d):
    if d['status'] == 'finished':
        print('Done downloading, now converting ...')

def download_video_from_url(sanitized_url, sanitized_file_location):
    location = '{location}/{id}.mp4'.format(location=sanitized_file_location
                                                    , id=uuid.uuid1().hex)
    ydl_opts = {
    'outtmpl': location,        
    'noplaylist' : True,        
    'progress_hooks': [my_hook],  
    }

    with YoutubeDL(ydl_opts) as ydl:
        ydl.download([sanitized_url])
    return location


#extract frame from youtube video
def extract_frame(movie, frame_name, time, imgdir):
    
    clip = editor.VideoFileClip(movie)
    imgpath = os.path.join(imgdir, '{name}_at_{time}.png'.format(name=frame_name, time=time))
    clip.save_frame(imgpath, time)
    return imgpath