# ✏️Doodle to Magic

📢 2025년 여름학기 [AIKU](https://github.com/AIKU-Official) 활동으로 진행한 프로젝트입니다 (🥉 동상 수상!!)  

**📌 vercel 링크**  
[Doodle-to-Magic](https://doodle-to-magic.vercel.app)

**🏀 프로젝트 링크**  
[AIKU-25-S-DoodleToMagic](https://github.com/hiyseo/aiku-25-S-DoodleToMagic)  

**💫 모델**  
[pokemon-scribble](https://huggingface.co/hiyseo/pokemon_scribble)

## 소개

본 프로젝트는 개인의 낙서 그림을 기반으로 3D 캐릭터를 자동 생성하는 것을 목표로 합니다. 

기존에는 낙서를 3D 실물로 제작하기 위해 많은 시간과 비용이 드는 수작업에 의존해야 했으며, 이 과정에서 낙서 고유의 창의성이 희석될 수 있었습니다. 이러한 문제를 해결하기 위해, 우리는 인공지능 기술을 활용하여 불완전한 낙서 형태를 해석해 완성도 높은 2D 캐릭터로 다듬고, 이를 기반으로 정확하고 매끄러운 3D 모델을 자동 생성하는 파이프라인을 구축하고자 합니다. 이 기술을 통해 누구나 자신의 상상력이 담긴 낙서를 손쉽게 디지털 창작물이나 실제 장난감으로 구현할 수 있게 될 것입니다.

## 방법론
**Pipeline**
<img width="859" height="323" alt="스크린샷 2025-09-13 오전 3 17 38" src="https://github.com/user-attachments/assets/6bb66dd1-f05f-47f5-a7fa-abcee569cc5c" />  

**Data pre-processing**

<img width="868" height="356" alt="스크린샷 2025-09-03 오전 12 18 44" src="https://github.com/user-attachments/assets/bd5274cf-79e8-4d45-9e8d-1924db4f638b" />
<img width="908" height="331" alt="스크린샷 2025-09-02 오후 10 11 10" src="https://github.com/user-attachments/assets/b6d238f0-8658-4f58-b87f-84ea1ac48351" />

**Training(LoRA)**
<img width="927" height="296" alt="스크린샷 2025-09-02 오후 11 22 02" src="https://github.com/user-attachments/assets/7aa8d218-e7ae-4c59-b588-9550e648355a" />



### Finetuning Dataset ###
| **데이터셋** | **설명** |
| --- | --- |
| [AMATEUR dataset](https://huggingface.co/datasets/keshan/amateur_drawings-controlnet-dataset) | 낙서 그림, 그리고 이를 segmentation한 그림, caption이 pair로 있는 데이터셋 |
| [Poketmon dataset](https://huggingface.co/datasets/reach-vb/pokemon-blip-captions) | poketmon 그림과 각 그림에 대한 caption이 달려있는 데이터 |  
<br>  
