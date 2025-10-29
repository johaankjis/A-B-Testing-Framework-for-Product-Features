"""
A/B Testing Framework - Statistical Analysis Script
Performs statistical tests and calculates significance
"""

import numpy as np
from scipy import stats
from typing import Dict, Tuple

def calculate_z_test(control_conversions: int, control_total: int, 
                     treatment_conversions: int, treatment_total: int) -> Dict:
    """
    Perform two-proportion z-test
    
    Args:
        control_conversions: Number of conversions in control
        control_total: Total users in control
        treatment_conversions: Number of conversions in treatment
        treatment_total: Total users in treatment
    
    Returns:
        Dictionary with test results
    """
    p1 = control_conversions / control_total
    p2 = treatment_conversions / treatment_total
    
    # Pooled proportion
    p_pool = (control_conversions + treatment_conversions) / (control_total + treatment_total)
    
    # Standard error
    se = np.sqrt(p_pool * (1 - p_pool) * (1/control_total + 1/treatment_total))
    
    # Z-score
    z_score = (p2 - p1) / se
    
    # Two-tailed p-value
    p_value = 2 * (1 - stats.norm.cdf(abs(z_score)))
    
    # Confidence interval for treatment
    ci_margin = 1.96 * np.sqrt(p2 * (1 - p2) / treatment_total)
    
    # Uplift calculations
    relative_uplift = (p2 - p1) / p1 if p1 > 0 else 0
    absolute_uplift = p2 - p1
    
    return {
        'control_rate': p1,
        'treatment_rate': p2,
        'z_score': z_score,
        'p_value': p_value,
        'confidence_interval': (p2 - ci_margin, p2 + ci_margin),
        'relative_uplift': relative_uplift,
        'absolute_uplift': absolute_uplift,
        'is_significant': p_value < 0.05
    }

def calculate_sample_size(baseline_rate: float, mde: float, 
                         alpha: float = 0.05, power: float = 0.8) -> int:
    """
    Calculate required sample size per variant
    
    Args:
        baseline_rate: Current conversion rate (0-1)
        mde: Minimum detectable effect (0-1)
        alpha: Significance level (default 0.05)
        power: Statistical power (default 0.8)
    
    Returns:
        Required sample size per variant
    """
    z_alpha = stats.norm.ppf(1 - alpha/2)
    z_beta = stats.norm.ppf(power)
    
    p1 = baseline_rate
    p2 = baseline_rate * (1 + mde)
    p_avg = (p1 + p2) / 2
    
    numerator = (z_alpha + z_beta) ** 2 * (p1 * (1 - p1) + p2 * (1 - p2))
    denominator = (p2 - p1) ** 2
    
    return int(np.ceil(numerator / denominator))

def calculate_confidence_interval(proportion: float, sample_size: int, 
                                 confidence: float = 0.95) -> Tuple[float, float]:
    """
    Calculate confidence interval for a proportion
    
    Args:
        proportion: Observed proportion (0-1)
        sample_size: Sample size
        confidence: Confidence level (default 0.95)
    
    Returns:
        Tuple of (lower_bound, upper_bound)
    """
    z = stats.norm.ppf((1 + confidence) / 2)
    se = np.sqrt(proportion * (1 - proportion) / sample_size)
    margin = z * se
    
    return (max(0, proportion - margin), min(1, proportion + margin))

# Example usage
if __name__ == "__main__":
    # Example data
    control_conv = 1895
    control_total = 22500
    treatment_conv = 2234
    treatment_total = 22500
    
    results = calculate_z_test(control_conv, control_total, 
                              treatment_conv, treatment_total)
    
    print("Statistical Test Results:")
    print(f"Control Rate: {results['control_rate']:.4f}")
    print(f"Treatment Rate: {results['treatment_rate']:.4f}")
    print(f"P-value: {results['p_value']:.6f}")
    print(f"Relative Uplift: {results['relative_uplift']:.2%}")
    print(f"Significant: {results['is_significant']}")
