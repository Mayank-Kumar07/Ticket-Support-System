import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report
from nltk.sentiment.vader import SentimentIntensityAnalyzer

class TicketClassifier:
    def __init__(self):
        self.vectorizer = TfidfVectorizer()
        self.sentiment_analyzer = SentimentIntensityAnalyzer()
        self.model = None

    def preprocess_text(self, text):
        # Perform any text preprocessing steps (e.g., tokenization, stemming, etc.)
        return text

    def extract_sentiment(self, text):
        # Use sentiment analysis to extract sentiment from text
        sentiment = self.sentiment_analyzer.polarity_scores(text)['compound']
        return sentiment

    def train(self, X_train, y_train, model_type='svm'):
        X_train_vectorized = self.vectorizer.fit_transform(X_train)

        if model_type == 'svm':
            param_grid = {'C': [0.1, 1, 10],
                          'gamma': [0.1, 1, 10],
                          'kernel': ['linear', 'rbf']}
            grid_search = GridSearchCV(SVC(), param_grid, cv=3)
            grid_search.fit(X_train_vectorized, y_train)
            self.model = grid_search.best_estimator_
        elif model_type == 'random_forest':
            param_grid = {'n_estimators': [50, 100, 200],
                          'max_depth': [None, 10, 20]}
            grid_search = GridSearchCV(RandomForestClassifier(), param_grid, cv=3)
            grid_search.fit(X_train_vectorized, y_train)
            self.model = grid_search.best_estimator_

    def predict(self, X_test):
        X_test_vectorized = self.vectorizer.transform(X_test)
        return self.model.predict(X_test_vectorized)

# Example usage
if __name__ == "__main__":
    # Load ticket data (X: ticket descriptions, y: categories)
    ticket_data = pd.read_csv('ticket_data.csv')
    X = ticket_data['description']
    y = ticket_data['category']
    ticket_urgency = ticket_data['urgency']

    # Split data into train and test sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Initialize and train ticket classifier
    classifier = TicketClassifier()
    classifier.train(X_train, y_train, model_type='svm')

    # Predict categories for test set
    y_pred = classifier.predict(X_test)

    # Evaluate model performance
    accuracy = accuracy_score(y_test, y_pred)
    print("Accuracy:", accuracy)
    print("Classification Report:")
    print(classification_report(y_test, y_pred))

    # Extract sentiment from ticket descriptions
    ticket_sentiments = [classifier.extract_sentiment(text) for text in X_test]

    # Combine sentiment and urgency for prioritization
    prioritized_tickets = [{'description': text, 'sentiment': sentiment, 'urgency': urgency}
                           for text, sentiment, urgency in zip(X_test, ticket_sentiments, ticket_urgency)]

    # Integrate with backend server to automatically categorize and prioritize tickets
    # Example: Send prioritized_tickets to backend API endpoint for processing
