from pathlib import Path
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
import joblib

BASE_DIR = Path(__file__).resolve().parents[1]
data_path = BASE_DIR / 'data' / 'sample_training_data.csv'
model_path = BASE_DIR / 'model' / 'dropout_model.joblib'


def main():
    df = pd.read_csv(data_path)
    X = df.drop(columns=['dropout'])
    y = df['dropout']

    categorical = ['gender']
    numeric = [
        'attendance_percentage',
        'academic_performance',
        'socioeconomic_score',
        'distance_from_school',
        'previous_failures',
        'behavioral_flags'
    ]

    preprocessor = ColumnTransformer(
        transformers=[('cat', OneHotEncoder(handle_unknown='ignore'), categorical), ('num', 'passthrough', numeric)]
    )

    model = Pipeline(
        steps=[('preprocessor', preprocessor), ('classifier', RandomForestClassifier(n_estimators=150, random_state=42))]
    )

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model.fit(X_train, y_train)
    acc = model.score(X_test, y_test)

    model_path.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(model, model_path)
    print(f'Model trained and saved to {model_path}. Accuracy: {acc:.3f}')


if __name__ == '__main__':
    main()
