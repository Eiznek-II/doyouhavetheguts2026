from skyfield.api import Star, load
from skyfield.data import hipparcos
from skyfield.units import Angle
import skyfield
import json
import math
import numpy as np

def magnitude(vector): 
    return math.sqrt(sum(pow(element, 2) for element in vector))

ly_conv = 1.0570008340247e-16

planets = load('de421.bsp')
earth = planets['earth']

ts = load.timescale()
t = ts.now()

with load.open(hipparcos.URL) as f:
    df = hipparcos.load_dataframe(f)
with open("constDataJSON\\index.json") as f:
    constellations = json.load(f)

actual_constellations = {}
for i in constellations["constellations"]:
    flat_lines = [star for set in i['lines'] for star in set]
    stars = {}
    edges = []
    star_x_pos = []
    star_y_pos = []
    for line in i['lines']:
        previous_star = None;
        for ii,star in enumerate(line):
            if star not in stars:
                stars[star] = len(stars)
                star_data = earth.at(t).observe(Star.from_dataframe(df.loc[star]))
            x,y,z = star_data.frame_xyz(skyfield.framelib.itrs).m
            a_x, a_y, a_z = star_data.radec()
            star_x_pos.append(a_x.radians)
            star_y_pos.append(a_y.radians)
            if ii >0:
                edges.append([previous_star,stars[star],ly_conv*magnitude([x-prev_x,y-prev_y,z-prev_z]) ])
            previous_star = stars[star]
            prev_x, prev_y, prev_z =x,y,z
        star_x_pos = [(x - min(star_x_pos)) for x in star_x_pos]
        star_x_pos = [(x / max(star_x_pos)) for x in star_x_pos]
        star_y_pos = [(y - min(star_y_pos)) for y in star_y_pos]
        star_y_pos = [(y / max(star_y_pos)) for y in star_y_pos]

    if len(stars) <=20:
        actual_constellations[i['common_name']['native']] = {"points": [[star_x_pos[i],star_y_pos[i] ] for i in range(len(star_x_pos))], "edges":edges}
    

actual_constellations_string = json.dumps(actual_constellations)
with open("constellations.json", "w", encoding="utf-8") as f:
    f.write(actual_constellations_string)


