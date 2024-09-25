from roboflow import Roboflow
from ultralytics import YOLO
import ultralytics
import yaml
import os
import torch

print(torch.cuda.is_available()) 
ultralytics.checks()
path = '/dataset_monitor-1'

if not os.path.exists(path):
  rf = Roboflow(api_key="pSKVxTiuweLONzMDubjk")
  project = rf.workspace("novia-putri-o163i").project("dataset_monitor")
  version = project.version(1)
  dataset = version.download("yolov8")  

data = {
    'test': 'C:/Users/SSAFY/Desktop/특화/yolo/dataset_monitor-1/test/images',
    'train': 'C:/Users/SSAFY/Desktop/특화/yolo/dataset_monitor-1/train/images',
    'val': 'C:/Users/SSAFY/Desktop/특화/yolo/dataset_monitor-1/valid/images',
    'names': ['monitor'],
    'nc': 1
}
with open('./dataset_monitor-1/data.yaml', 'w') as f:
  yaml.dump(data, f)

if __name__ == '__main__':
  model = YOLO('yolov8n.pt')
  model.train(data='./dataset_monitor-1/data.yaml', epochs=100, patience=50, imgsz=420, batch=32, device='cuda')
  model.save('./monitor.pt')