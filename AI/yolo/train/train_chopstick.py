from roboflow import Roboflow
from ultralytics import YOLO
import ultralytics
import yaml
import os
import torch

print(torch.cuda.is_available()) 
ultralytics.checks()

# 현재 실행 중인 스크립트의 디렉토리 경로 가져오기
current_dir = os.path.dirname(os.path.abspath(__file__))
# 절대 경로 설정: 예를 들어, 'data' 폴더 내 파일 경로
path = os.path.abspath(os.path.join(current_dir, '..', 'dataset', 'chopstick-1'))
save_path = os.path.abspath(os.path.join(current_dir, '..', 'model', 'chopstick.pt'))
save_path2 = os.path.abspath(os.path.join(current_dir, '../..', 'flask', 'model', 'chopstick.pt'))

if not os.path.exists(path):
  rf = Roboflow(api_key="pSKVxTiuweLONzMDubjk")
  project = rf.workspace("capstone52").project("chopstick")
  version = project.version(1)
  dataset = version.download("yolov8", location=path)
                
data = {
    'test': os.path.join(path, 'test', 'images'),
    'train': os.path.join(path, 'train', 'images'),
    'val': os.path.join(path, 'valid', 'images'),
    'names': ['chopstick'],
    'nc': 1
}
# YAML 파일 쓰기
yaml_file_path = os.path.join(path, 'data.yaml')
with open(yaml_file_path, 'w') as f:
    yaml.dump(data, f)

if __name__ == '__main__':
    model = YOLO('yolov8n.pt')
    model.train(data=yaml_file_path, epochs=100, patience=50, imgsz=420, batch=32, device='cuda')
    model.save(save_path)
    model.save(save_path2)