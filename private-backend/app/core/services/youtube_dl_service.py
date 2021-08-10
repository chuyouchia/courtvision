import os
from moviepy import editor
from youtube_dl import YoutubeDL

def my_hook(d):
    if d['status'] == 'finished':
        print('Done downloading, now converting ...')

def download_video_from_url(sanitized_url, sanitized_file_location, sanitized_temp_id):
    ydl_opts = {
    'outtmpl': '{location}/{id}s.%(ext)s'.format(location=sanitized_file_location
                                                    , id=sanitized_temp_id),        
    'noplaylist' : True,        
    'progress_hooks': [my_hook],  
    }

    with YoutubeDL(ydl_opts) as ydl:
        ydl.download([sanitized_url])
    return True


#extract frame from youtube video
def extract_frame(movie, time, imgdir):
    
    clip = editor.VideoFileClip(movie)
    imgpath = os.path.join(imgdir, '{}.png'.format(time))
    clip.save_frame(imgpath, time)
