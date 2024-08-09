from model import Model
from Configs import Configs
import pandas as pd
import torch
import sys
import ezodf
import sys
import os
import numpy as np
import os
import sys
import numpy as np
from load_MRT import load_ods
from utils import *
from model import Model
from Configs import Configs
from tqdm import tqdm

def train_epoch(model, dataloader, criterion, optimizer, device):
    model.train()
    total_loss = 0
    for X, y in tqdm(dataloader):
        X, y = X.to(device).float(), y.to(device).float()  # Ensure dtype is float32
        optimizer.zero_grad()
        outputs = model(X, None, None, None)
        #print(f"Debug: outputs shape: {outputs.shape}")
        #print(f"Debug: y shape: {y.shape}")
        loss = criterion(outputs[:,:,0], y)  # Predicting 'close' prices
        loss.backward()
        optimizer.step()
        total_loss += loss.item()
    return total_loss / len(dataloader)

def evaluate(model, dataloader, criterion, device):
    model.eval()
    total_loss = 0
    with torch.no_grad():
        for X, y in tqdm(dataloader):
            X, y = X.to(device).float(), y.to(device).float()  # Ensure dtype is float32
            outputs = model(X, None, None, None)
            loss = criterion(outputs[:,:,0], y)
            total_loss += loss.item()
    return total_loss / len(dataloader)

def train_model(model, train_loader, val_loader, criterion, optimizer, num_epochs, device, checkpoint_dir='checkpoints'):
    os.makedirs(checkpoint_dir, exist_ok=True)
    best_val_loss = float('inf')
    best_epoch = 0

    with open('loss.txt', 'w') as f:
        f.write('Epoch,Train Loss,Val Loss\n')
    print("Training...")
    for epoch in tqdm(range(num_epochs)):
        train_loss = train_epoch(model, train_loader, criterion, optimizer, device)
        print("evaluating")
        val_loss = evaluate(model, val_loader, criterion, device)
        print(f'Epoch {epoch+1}, Train Loss: {train_loss:.4f}, Val Loss: {val_loss:.4f}')

        with open('loss.txt', 'a') as f:
            f.write(f'{epoch+1},{train_loss:.4f},{val_loss:.4f}\n')
        
        # Save checkpoint
        checkpoint_filename = os.path.join(checkpoint_dir, f'checkpoint_epoch_{epoch+1}.pth')
        save_checkpoint(model, optimizer, epoch+1, checkpoint_filename)
        
        if val_loss < best_val_loss:
            best_val_loss = val_loss
            best_epoch = epoch + 1
            best_model_filename = os.path.join(checkpoint_dir, 'best_model.pth')
            save_checkpoint(model, optimizer, epoch+1, best_model_filename)

    # Load the best model for evaluation
    best_epoch = load_checkpoint(model, optimizer, best_model_filename, device)
    print(f'Loaded best model from epoch {best_epoch}')

    return best_epoch
if __name__ == '__main__':
    filename = "../data/202401_cht.ods"
    df = load_ods(filename)
    df = df[0:31]
    print(df['　　　　車站\n日期'])
    print(get_day_of_week(df['　　　　車站\n日期'][0]))

    model_configs = Configs()
    model = Model(model_configs)

    resume_training = False
    save_dir = './checkpoints'
    if resume_training:
        model.load_model(save_dir+'/model.pth')
    batch_size = 1
    num_epochs = 100