# Day 1: ML Fundamentals & Linear Regression

**Week**: 1 | **Tier**: 1 (Foundations) | **Time**: 4-5 hours  
**Prerequisites**: Basic Python, High School Algebra  
**Learning Objectives**:
- Understand the supervised learning workflow from raw data to deployed model
- Distinguish between regression and classification problems
- Derive and implement linear regression from first principles
- Build intuition for the bias-variance tradeoff
- Implement gradient descent for linear regression manually

---

## The Hook: Why This Matters

You're a data scientist at a real estate company. Your boss walks in and says: *"We need to price 10,000 new houses hitting the market next week. Can you predict their values?"*

You can't manually inspect each one. You can't use simple averages (houses vary wildly). What you need is a **model** that learns the relationship between house features (square footage, bedrooms, location) and price.

This is **supervised learning** — and linear regression is where it all begins.

**By the end of today**, you'll build a system that:
- Predicts house prices with mathematical rigor
- Understands *why* the model makes certain predictions
- Debugs when predictions go wrong
- Can explain the entire pipeline in a technical interview

Linear regression isn't just an academic exercise. It's the foundation of:
- **Recommender Systems** (Netflix predicting ratings)
- **Risk Modeling** (banks predicting loan defaults)
- **Time Series Forecasting** (sales predictions)
- **Feature Engineering** (understanding variable importance)

Even in the era of deep learning, linear models are the *first baseline* every ML engineer builds. Master this, and you're building the intuition that carries through transformers, LLMs, and beyond.

---

## Intuition First: The Mental Models

### Primary Analogy: The Thermometer Calibration

Imagine you're calibrating a thermometer that reads Celsius but you want Fahrenheit predictions.

You collect data:
- Input (°C): 0, 10, 20, 30, 40
- Output (°F): 32, 50, 68, 86, 104

You notice a **pattern**: `°F = (1.8 × °C) + 32`

This is **linear regression**:
- The **1.8** is the **slope** (how much F changes per C)
- The **32** is the **intercept** (baseline when C = 0)
- You "learned" this relationship from data

**The model is a straight line** that best fits your observations. New input? Plug into the formula.

### Alternative Mental Model: The GPS Route Predictor

Your GPS app predicts arrival time based on distance:
- 10 miles → 20 minutes
- 20 miles → 40 minutes
- 50 miles → 100 minutes

Pattern: `Time = 2 × Distance` (assuming steady 30 mph)

But what if there's traffic? Your GPS adjusts:
- `Time = 2 × Distance + 10` (adds 10-minute baseline delay)

**This is what linear regression does**: finds the "conversion rate" (slope) and baseline (intercept) that minimizes prediction errors across all your data.

### Common Misconception

❌ **WRONG**: "Linear regression only works for straight-line relationships"  
✓ **RIGHT**: "Linear regression works for ANY relationship that's linear *in the parameters*"

Examples of "linear" models (in parameters):
- `y = w₁x + w₂x² + b` (polynomial, but linear in w₁, w₂, b)
- `y = w₁·log(x) + w₂·√x + b` (still linear in weights)

The "linear" refers to how we **combine features**, not the shape of the relationship.

---

## Mathematical Foundation: The Geometry of Lines

### The Core Equation

**Single Variable (Simple Linear Regression):**
$$y = wx + b$$

- $y$ = **Prediction** (what we want to estimate)
- $x$ = **Feature** (input variable, e.g., square footage)
- $w$ = **Weight/Slope** (how much $y$ changes per unit of $x$)
- $b$ = **Bias/Intercept** (value of $y$ when $x = 0$)

**Multiple Variables (Multiple Linear Regression):**
$$y = w_1x_1 + w_2x_2 + \ldots + w_nx_n + b$$

In **matrix form**:
$$\mathbf{y} = \mathbf{X}\mathbf{w} + b$$

Where:
- $\mathbf{y}$ is an $m \times 1$ vector of predictions
- $\mathbf{X}$ is an $m \times n$ matrix of features (m samples, n features)
- $\mathbf{w}$ is an $n \times 1$ vector of weights
- $b$ is the scalar bias (or $m \times 1$ vector of repeated bias values)

### The Loss Function: Mean Squared Error (MSE)

**Purpose**: Measure how "wrong" our predictions are.

**Formula**:
$$\text{MSE} = \frac{1}{m}\sum_{i=1}^{m}(y_i - \hat{y}_i)^2$$

Where:
- $y_i$ = **Actual value** (ground truth)
- $\hat{y}_i$ = **Predicted value** ($wx_i + b$)
- $m$ = Number of training examples

**Why squared errors?**
1. **Penalizes large errors** more than small ones (error of 10 is 100× worse than error of 1)
2. **Always positive** (errors don't cancel out)
3. **Mathematically convenient** (differentiable, nice gradients)

**Derivation of the Gradient** (Single Variable Case):

Our goal: Minimize $\text{MSE}$ by finding optimal $w$ and $b$.

**Step 1**: Expand the loss function
$$L(w, b) = \frac{1}{m}\sum_{i=1}^{m}(y_i - (wx_i + b))^2$$

**Step 2**: Take partial derivative with respect to $w$
$$\frac{\partial L}{\partial w} = \frac{1}{m}\sum_{i=1}^{m} 2(y_i - (wx_i + b)) \cdot (-x_i)$$
$$= -\frac{2}{m}\sum_{i=1}^{m} x_i(y_i - \hat{y}_i)$$

**Step 3**: Take partial derivative with respect to $b$
$$\frac{\partial L}{\partial b} = -\frac{2}{m}\sum_{i=1}^{m}(y_i - \hat{y}_i)$$

**Step 4**: Gradient Descent Update Rule
$$w := w - \alpha \frac{\partial L}{\partial w}$$
$$b := b - \alpha \frac{\partial L}{\partial b}$$

Where $\alpha$ is the **learning rate** (step size).

### Hand-Worked Example

**Dataset**: Predict house price from square footage
| Square Feet ($x$) | Price ($y$, in $1000s) |
|-------------------|------------------------|
| 1 | 2 |
| 2 | 4 |
| 3 | 5 |

**Initial guess**: $w = 0$, $b = 0$, $\alpha = 0.1$

**Iteration 1:**

Predictions: $\hat{y}_1 = 0(1) + 0 = 0$, $\hat{y}_2 = 0$, $\hat{y}_3 = 0$

Errors: $(2-0) = 2$, $(4-0) = 4$, $(5-0) = 5$

Gradient for $w$:
$$\frac{\partial L}{\partial w} = -\frac{2}{3}[1(2) + 2(4) + 3(5)] = -\frac{2}{3}[2 + 8 + 15] = -\frac{50}{3} \approx -16.67$$

Gradient for $b$:
$$\frac{\partial L}{\partial b} = -\frac{2}{3}[2 + 4 + 5] = -\frac{22}{3} \approx -7.33$$

Updates:
$$w := 0 - 0.1(-16.67) = 1.667$$
$$b := 0 - 0.1(-7.33) = 0.733$$

**Iteration 2** (with $w = 1.667$, $b = 0.733$):

New predictions:
- $\hat{y}_1 = 1.667(1) + 0.733 = 2.4$
- $\hat{y}_2 = 1.667(2) + 0.733 = 4.067$
- $\hat{y}_3 = 1.667(3) + 0.733 = 5.734$

New errors: $(2-2.4) = -0.4$, $(4-4.067) = -0.067$, $(5-5.734) = -0.734$

MSE: $\frac{1}{3}[0.16 + 0.0045 + 0.539] \approx 0.234$ (much better than initial!)

**Continue until convergence** (gradients ≈ 0).

### Closed-Form Solution: Normal Equation

**For small datasets**, we can solve directly without iteration:

$$\mathbf{w} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$$

**Pros**: One-step solution, no learning rate needed  
**Cons**: $O(n^3)$ complexity (slow for large $n$), requires matrix inversion

**When to use:**
- ✓ Small datasets (< 10,000 samples, < 100 features)
- ✓ When you need exact solution
- ✗ Avoid for large-scale ML (use gradient descent instead)

### Math-to-Library Mapping

| Mathematical Symbol | Meaning | NumPy/sklearn | PyTorch |
|---------------------|---------|---------------|---------|
| $w$ (weights) | Slope(s) | `coef_` | `weight` |
| $b$ (bias) | Intercept | `intercept_` | `bias` |
| $\alpha$ (alpha) | Learning rate | N/A (closed-form) | `lr` |
| $\mathbf{X}$ | Feature matrix | Input array | `x` (tensor) |
| $\mathbf{y}$ | Target vector | Target array | `y` (tensor) |
| MSE | Loss function | `mean_squared_error` | `nn.MSELoss()` |

---

## Implementation: From Scratch vs Library

### Educational Implementation (NumPy)

```python
import numpy as np
import matplotlib.pyplot as plt

class LinearRegressionScratch:
    """Simple Linear Regression with Gradient Descent"""
    
    def __init__(self, learning_rate: float = 0.01, n_iterations: int = 1000):
        self.lr = learning_rate
        self.n_iterations = n_iterations
        self.weights = None
        self.bias = None
        self.loss_history = []
    
    def fit(self, X: np.ndarray, y: np.ndarray) -> None:
        """
        Train the model using gradient descent.
        
        Args:
            X: Feature matrix of shape (m, n)
            y: Target vector of shape (m,)
        """
        m, n = X.shape
        
        # Initialize parameters
        self.weights = np.zeros(n)
        self.bias = 0
        
        # Gradient descent loop
        for i in range(self.n_iterations):
            # Forward pass: compute predictions
            y_pred = self.predict(X)
            
            # Compute loss (MSE)
            loss = np.mean((y - y_pred) ** 2)
            self.loss_history.append(loss)
            
            # Compute gradients
            dw = -(2/m) * X.T.dot(y - y_pred)
            db = -(2/m) * np.sum(y - y_pred)
            
            # Update parameters
            self.weights -= self.lr * dw
            self.bias -= self.lr * db
            
            # Print progress every 100 iterations
            if i % 100 == 0:
                print(f"Iteration {i}: Loss = {loss:.4f}")
    
    def predict(self, X: np.ndarray) -> np.ndarray:
        """Make predictions for input X"""
        return X.dot(self.weights) + self.bias
    
    def score(self, X: np.ndarray, y: np.ndarray) -> float:
        """Calculate R² score (coefficient of determination)"""
        y_pred = self.predict(X)
        ss_res = np.sum((y - y_pred) ** 2)  # Residual sum of squares
        ss_tot = np.sum((y - np.mean(y)) ** 2)  # Total sum of squares
        return 1 - (ss_res / ss_tot)

# Verify with hand-calculated example
X_simple = np.array([[1], [2], [3]])
y_simple = np.array([2, 4, 5])

model = LinearRegressionScratch(learning_rate=0.1, n_iterations=500)
model.fit(X_simple, y_simple)

print(f"\nFinal weights: {model.weights[0]:.3f}")
print(f"Final bias: {model.bias:.3f}")
print(f"R² score: {model.score(X_simple, y_simple):.3f}")

# Expected: weights ≈ 1.5, bias ≈ 0.667 (matches our hand calculation trend)
```

**Verification Against Hand Calculations:**
The model converges to values close to our manual iterations, validating our implementation!

### Production Implementation (scikit-learn)

```python
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.datasets import fetch_california_housing
import pandas as pd

# Load real dataset
housing = fetch_california_housing()
X = pd.DataFrame(housing.data, columns=housing.feature_names)
y = housing.target

# Split data (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model (uses closed-form solution by default)
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred)

print(f"Root Mean Squared Error: ${rmse:.2f} (in $100,000s)")
print(f"R² Score: {r2:.3f}")
print(f"\nFeature Importances:")
for name, coef in zip(housing.feature_names, model.coef_):
    print(f"  {name:12s}: {coef:7.3f}")
```

**Key Differences:**
- `sklearn` uses optimized closed-form solution (faster for moderate datasets)
- Handles feature scaling internally if using `Pipeline`
- Production-ready error handling and edge cases

💡 **Key Insight**: Your from-scratch implementation teaches *how* the algorithm works. `sklearn` is what you use in production. Know both.

---

## Real-World Application: Predicting Airbnb Prices

### Industry Use Case: Airbnb Dynamic Pricing

**Problem**: Airbnb hosts struggle to price their listings competitively. Too high → no bookings. Too low → lost revenue.

**Solution**: Linear regression model that predicts optimal price based on:
- Number of bedrooms/bathrooms
- Location (neighborhood encoded)
- Amenities count
- Historical booking rate
- Seasonality (month of year)

**Impact**: Hosts using price suggestions see **14% increase in booking rate** and **$20/night higher average revenue**.

**Model Equation** (simplified):
```
Price = 50 + 30·(bedrooms) + 25·(bathrooms) + 5·(amenities) + 0.2·(reviews) + 15·(neighborhood_score)
```

**Interpretation**:
- Each additional bedroom adds $30/night
- Moving to a neighborhood with +1.0 score adds $15/night
- Baseline price (studio, 1 bath, no amenities) = $50/night

### When to Use Linear Regression

✓ **Use when:**
- Relationship between features and target is approximately linear
- You need **interpretability** (which features matter most?)
- Dataset is small-to-medium (< 1M rows)
- You need a **fast baseline** before trying complex models
- Features are continuous (or can be encoded as such)

✗ **Don't use when:**
- Relationship is highly non-linear (use polynomial features or tree-based models)
- Categorical features dominate (one-hot encoding may create too many features)
- Target variable is binary (use logistic regression instead)
- Data has outliers (linear regression is sensitive; consider robust regression)

### Comparison with Alternatives

| Method | Pros | Cons | When to Use |
|--------|------|------|-------------|
| **Linear Regression** | Fast, interpretable, low variance | High bias if relationship is non-linear | First baseline, interpretability critical |
| **Polynomial Regression** | Captures non-linearity | Overfits easily, less interpretable | Curved relationships, small datasets |
| **Ridge/Lasso** | Handles multicollinearity, prevents overfitting | Still assumes linearity | Many correlated features |
| **Decision Trees** | Handles non-linearity, no scaling needed | High variance, less smooth predictions | Complex interactions, categorical data |

---

## Debugging Checklist

### Common Issue 1: Predictions Are Terrible (R² < 0.5)

**Symptom**: Model performs worse than just predicting the mean.

**Check:**
1. **Feature scaling**: Are features on wildly different scales?
   ```python
   from sklearn.preprocessing import StandardScaler
   scaler = StandardScaler()
   X_scaled = scaler.fit_transform(X)
   ```
2. **Relationship is non-linear**: Plot features vs target
   ```python
   plt.scatter(X[:, 0], y)  # Look for curves
   ```
3. **Missing important features**: Try polynomial features
   ```python
   from sklearn.preprocessing import PolynomialFeatures
   poly = PolynomialFeatures(degree=2, include_bias=False)
   X_poly = poly.fit_transform(X)
   ```

**Quick Fix**:
```python
# Add interaction and squared terms
X_enhanced = np.hstack([X, X**2, X[:, 0:1] * X[:, 1:2]])
model.fit(X_enhanced, y)
```

**Prevention**: Always visualize data before modeling. Use `sns.pairplot()` to spot non-linearities.

---

### Common Issue 2: Gradient Descent Won't Converge

**Symptom**: Loss oscillates or increases instead of decreasing.

**Check:**
1. **Learning rate too high**: Try reducing by 10x
   ```python
   model = LinearRegressionScratch(learning_rate=0.001)  # Was 0.01
   ```
2. **Features not scaled**: Standardize first
3. **NaN/Inf in data**: Check for missing values

**Debugging Code**:
```python
# Plot loss curve
plt.plot(model.loss_history)
plt.xlabel('Iteration')
plt.ylabel('MSE')
plt.title('Loss Should Decrease Monotonically')
plt.show()

# If loss looks like a sawtooth: learning rate too high
# If loss plateaus early: learning rate too low or local minimum
```

**Prevention**: Always scale features. Start with small learning rate (0.001-0.01).

---

### Common Issue 3: Model Memorizes Training Data (Overfitting)

**Symptom**: Train R² = 0.99, Test R² = 0.40

**Check:**
1. **Too many features**: Use regularization (Ridge/Lasso)
2. **Polynomial degree too high**: Reduce from degree=5 to degree=2
3. **Tiny dataset**: Get more data or simplify model

**Quick Fix**:
```python
from sklearn.linear_model import Ridge
model = Ridge(alpha=1.0)  # Regularization strength
model.fit(X_train, y_train)
```

**Prevention**: Always use train/test split. Monitor both metrics during training.

---

### Common Issue 4: Coefficients Don't Make Sense

**Symptom**: Model says "each additional bedroom *reduces* price by $50"

**Check:**
1. **Multicollinearity**: Features are highly correlated
   ```python
   correlation_matrix = X.corr()
   # Look for correlations > 0.8
   ```
2. **Feature leakage**: Accidentally included the target in features
3. **Wrong units**: Check if features need log transform

**Quick Fix**:
```python
# Remove highly correlated features
from numpy.linalg import cond
condition_number = cond(X.T.dot(X))
if condition_number > 30:
    print("High multicollinearity detected!")
```

**Prevention**: Check correlation matrix before training. Use domain knowledge to validate coefficients.

---

## Exercises (With Solutions)

### Level 1: Hand Calculation + Code Verification (30-45 minutes)

**Dataset**:
| Study Hours ($x$) | Exam Score ($y$) |
|-------------------|------------------|
| 1 | 50 |
| 2 | 60 |
| 3 | 70 |
| 4 | 80 |

**Tasks**:
1. Calculate optimal $w$ and $b$ using the Normal Equation on paper
2. Verify your answer by implementing gradient descent in NumPy
3. Plot the fitted line and data points

<details>
<summary>Solution</summary>

**Normal Equation Solution**:
$$\mathbf{X} = \begin{bmatrix} 1 & 1 \\ 1 & 2 \\ 1 & 3 \\ 1 & 4 \end{bmatrix}, \quad \mathbf{y} = \begin{bmatrix} 50 \\ 60 \\ 70 \\ 80 \end{bmatrix}$$

$$\mathbf{X}^T\mathbf{X} = \begin{bmatrix} 4 & 10 \\ 10 & 30 \end{bmatrix}, \quad (\mathbf{X}^T\mathbf{X})^{-1} = \begin{bmatrix} 1.5 & -0.5 \\ -0.5 & 0.2 \end{bmatrix}$$

$$\mathbf{w} = \begin{bmatrix} b \\ w \end{bmatrix} = \begin{bmatrix} 1.5 & -0.5 \\ -0.5 & 0.2 \end{bmatrix} \begin{bmatrix} 260 \\ 700 \end{bmatrix} = \begin{bmatrix} 40 \\ 10 \end{bmatrix}$$

**Answer**: $w = 10$, $b = 40$ (Each study hour adds 10 points, baseline = 40)

**Code**:
```python
X = np.array([1, 2, 3, 4]).reshape(-1, 1)
y = np.array([50, 60, 70, 80])

# Add bias column
X_with_bias = np.hstack([np.ones((4, 1)), X])

# Normal equation
w_optimal = np.linalg.inv(X_with_bias.T.dot(X_with_bias)).dot(X_with_bias.T).dot(y)
print(f"Bias: {w_optimal[0]}, Weight: {w_optimal[1]}")  # Should be 40, 10

# Verify with gradient descent
model = LinearRegressionScratch(learning_rate=0.01, n_iterations=1000)
model.fit(X, y)
print(f"GD Bias: {model.bias:.1f}, Weight: {model.weights[0]:.1f}")
```
</details>

---

### Level 2: Apply to Real Dataset (1-2 hours)

**Dataset**: Boston Housing (or California Housing)

**Tasks**:
1. Load dataset and split 80/20 train/test
2. Train linear regression model
3. Identify the top 3 most important features (highest absolute coefficients)
4. Create a scatter plot: Predicted vs Actual prices (test set)
5. Calculate RMSE and R² on test set
6. **Challenge**: Improve R² by adding polynomial features (degree=2)

<details>
<summary>Solution Skeleton</summary>

```python
from sklearn.datasets import fetch_california_housing
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import Pipeline

# Load and split
housing = fetch_california_housing()
X_train, X_test, y_train, y_test = train_test_split(
    housing.data, housing.target, test_size=0.2, random_state=42
)

# Baseline model
model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

print(f"Baseline R²: {r2_score(y_test, y_pred):.3f}")

# Identify important features
feature_importance = pd.DataFrame({
    'feature': housing.feature_names,
    'coefficient': model.coef_
}).sort_values('coefficient', key=abs, ascending=False)
print(feature_importance.head(3))

# Improved model with polynomial features
poly_model = Pipeline([
    ('poly', PolynomialFeatures(degree=2, include_bias=False)),
    ('linear', LinearRegression())
])
poly_model.fit(X_train, y_train)
y_pred_poly = poly_model.predict(X_test)

print(f"Polynomial R²: {r2_score(y_test, y_pred_poly):.3f}")
```
</details>

---

### Level 3: Combine Concepts + Real Data (3-4 hours)

**Project**: Build a Complete ML Pipeline for Ames Housing Dataset

**Tasks**:
1. Download [Ames Housing Dataset](https://www.kaggle.com/c/house-prices-advanced-regression-techniques)
2. Handle missing values (mean imputation for numerical, mode for categorical)
3. Encode categorical features (one-hot encoding)
4. Create 5 new features using domain knowledge (e.g., TotalSF = 1stFlrSF + 2ndFlrSF)
5. Train Ridge regression with cross-validation to find best alpha
6. Visualize feature importance (top 10)
7. Submit predictions to Kaggle (target: Top 50% leaderboard)

**Deliverable**: Jupyter notebook with:
- EDA (Exploratory Data Analysis) section
- Feature engineering justification
- Model performance comparison (Linear vs Ridge vs Lasso)
- Final RMSE on test set

<details>
<summary>Starter Code</summary>

```python
import pandas as pd
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import RidgeCV

# Load data
train = pd.read_csv('train.csv')
test = pd.read_csv('test.csv')

# Feature engineering example
train['TotalSF'] = train['1stFlrSF'] + train['2ndFlrSF']
train['TotalBath'] = train['FullBath'] + 0.5 * train['HalfBath']

# Handle missing values
num_features = train.select_dtypes(include=['float64', 'int64']).columns
train[num_features] = train[num_features].fillna(train[num_features].mean())

# One-hot encoding
train_encoded = pd.get_dummies(train, drop_first=True)

# Separate features and target
X = train_encoded.drop('SalePrice', axis=1)
y = train_encoded['SalePrice']

# Ridge with cross-validation (finds best alpha automatically)
model = RidgeCV(alphas=[0.1, 1.0, 10.0, 100.0], cv=5)
model.fit(X, y)

print(f"Best alpha: {model.alpha_}")
print(f"CV R²: {cross_val_score(model, X, y, cv=5).mean():.3f}")
```
</details>

---

## Interview Prep

### Conceptual Questions

**Q1: What's the difference between correlation and regression?**  
**A**: Correlation measures the *strength* of a linear relationship (range: -1 to +1) but doesn't imply causation or prediction. Regression builds a *predictive model* that quantifies exactly how much $y$ changes for a unit change in $x$. Correlation is symmetric ($r_{xy} = r_{yx}$), but regression is directional (predicting $y$ from $x$ vs $x$ from $y$ gives different models).

**Q2: Why do we square errors in MSE instead of using absolute errors?**  
**A**: (1) Squared errors are **differentiable everywhere**, making gradient-based optimization smooth. (2) They **penalize large errors** disproportionately (error of 10 is 100× worse than 1), which is often desirable. (3) Historical reason: Squared errors have nice **statistical properties** (Gauss-Markov theorem). Absolute errors (MAE) are more robust to outliers but harder to optimize.

**Q3: When would you use Ridge vs Lasso regression?**  
**A**: **Ridge** ($L2$ penalty) shrinks all coefficients but keeps all features. Use when all features are potentially useful. **Lasso** ($L1$ penalty) can zero out coefficients, performing feature selection. Use when you suspect many features are irrelevant. In practice, **ElasticNet** (combines both) is often best.

**Q4: What's the bias-variance tradeoff in linear regression?**  
**A**: Simple linear regression has **high bias** (underfits complex data) but **low variance** (stable predictions). Adding polynomial features reduces bias (fits better) but increases variance (sensitive to noise). The sweet spot depends on data complexity. Regularization (Ridge/Lasso) controls variance by penalizing complex models.

**Q5: How do you detect if your features are multicollinear?**  
**A**: Check (1) **Correlation matrix** (look for values > 0.8), (2) **Variance Inflation Factor (VIF)** (values > 10 indicate collinearity), or (3) **Condition number** of $\mathbf{X}^T\mathbf{X}$ (> 30 is problematic). Solutions: Remove redundant features, use PCA, or apply Ridge regression (which handles multicollinearity better than OLS).

---

### Coding Challenge

**Problem**: Implement gradient descent for linear regression **without using any ML libraries** (only NumPy). Your function should:
- Take `X` (features), `y` (targets), `learning_rate`, and `n_iterations` as inputs
- Return learned weights and bias
- Print loss every 100 iterations

**Test Case**:
```python
X = np.array([[1], [2], [3], [4]])
y = np.array([2, 4, 6, 8])  # Perfect line: y = 2x
w, b = gradient_descent(X, y, learning_rate=0.01, n_iterations=1000)
# Expected: w ≈ 2.0, b ≈ 0.0
```

<details>
<summary>Hint</summary>

Structure:
1. Initialize `w = 0`, `b = 0`
2. Loop for `n_iterations`:
   - Compute predictions: `y_pred = X @ w + b`
   - Compute loss: `mse = mean((y - y_pred)^2)`
   - Compute gradients: `dw`, `db` (use formulas from Math section)
   - Update: `w -= lr * dw`, `b -= lr * db`
3. Return `w`, `b`
</details>

---

### System Design (Bonus for Advanced Learners)

**Problem**: Design a real-time house price prediction API that serves 10,000 requests/day.

**Key Considerations**:
1. **Model Training**: Retrain weekly on new listing data (batch job)
2. **Feature Store**: Precompute neighborhood statistics (Redis cache)
3. **Prediction**: FastAPI endpoint with <100ms latency
4. **Monitoring**: Track prediction drift (are prices shifting over time?)
5. **Scaling**: Dockerize, deploy on Kubernetes with auto-scaling

**Architecture Sketch**:
```
User → Load Balancer → FastAPI (3 replicas) → Model (in-memory)
                                ↓
                          Redis (features)
                                ↓
                     PostgreSQL (raw data)
                                ↓
                  Airflow (weekly retraining)
```

---

## Next Steps

**Enables**: 
- **Day 2** (Logistic Regression): Extends linear regression to classification using sigmoid activation
- **Day 4** (Gradient Descent Deep Dive): Deeper mathematical exploration of the optimization we used today
- **Week 3** (Neural Networks): Linear regression is the foundation — neural nets just stack many learned linear transformations

**Deeper Learning**:
- [📘 StatQuest: Linear Regression](https://www.youtube.com/watch?v=nk2CQITm_eo) (Intuitive video explanation)
- [📄 Stanford CS229 Notes](http://cs229.stanford.edu/notes2021fall/cs229-notes1.pdf) (Rigorous math treatment)
- [💻 scikit-learn User Guide](https://scikit-learn.org/stable/modules/linear_model.html) (Production best practices)

**Practice Resources**:
- [Kaggle: House Prices Competition](https://www.kaggle.com/c/house-prices-advanced-regression-techniques)
- [DataCamp: Linear Regression in Python](https://www.datacamp.com/courses/linear-regression-in-python)

---

## Summary Checklist

By the end of this tutorial, you should be able to:

- [ ] Explain linear regression using at least two different analogies
- [ ] Derive the gradient of MSE with respect to weights and bias
- [ ] Implement gradient descent from scratch in NumPy
- [ ] Calculate the Normal Equation solution by hand for a 3-sample dataset
- [ ] Use scikit-learn's `LinearRegression` for production pipelines
- [ ] Interpret coefficients (e.g., "Each bedroom adds $30k to price")
- [ ] Debug common issues (non-convergence, overfitting, multicollinearity)
- [ ] Decide when to use linear regression vs alternatives

**Congratulations!** You've built the foundation of modern machine learning. Everything from here — neural networks, transformers, LLMs — builds on the concepts you learned today: **loss functions, gradients, and iterative optimization**.

Tomorrow (Day 2), we'll extend this to **classification** by adding a single non-linearity: the sigmoid function. Same principles, new application. Let's go! 🚀
