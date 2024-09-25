from roboflow import Roboflow
from ultralytics import YOLO
import ultralytics
import yaml
import os
import torch

print(torch.cuda.is_available()) 
ultralytics.checks()

path = '/sikat-gigi-model-1'

if not os.path.exists(path):
  rf = Roboflow(api_key="pSKVxTiuweLONzMDubjk")
  project = rf.workspace("objek-dalam-6-ayunda").project("sikat-gigi-model")
  version = project.version(1)
  dataset = version.download("yolov8")
                
data = {
    'test': f'C:/Users/SSAFY/Desktop/특화/yolo/{path}/test/images',
    'train': f'C:/Users/SSAFY/Desktop/특화/yolo/{path}/train/images',
    'val': f'C:/Users/SSAFY/Desktop/특화/yolo/{path}/valid/images',
    'names': ['toothbrush'],
    'nc': 1
}
with open(f'./{path}/data.yaml', 'w') as f:
  yaml.dump(data, f)

if __name__ == '__main__':
    model = YOLO('yolov8n.pt')
    print(path)
    model.train(data=f'./{path}/data.yaml', epochs=100, patience=50, imgsz=420, batch=32, device='cuda')
    model.save('./toothbrush.pt')