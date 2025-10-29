-- A/B Testing Framework - Metrics Query
-- Calculates conversion rates and sample sizes for each variant

WITH variant_metrics AS (
    SELECT 
        e.id AS experiment_id,
        e.name AS experiment_name,
        v.id AS variant_id,
        v.name AS variant_name,
        v.is_control,
        COUNT(DISTINCT ua.user_id) AS total_users,
        COUNT(DISTINCT CASE 
            WHEN ev.event_type = 'conversion' 
            THEN ev.user_id 
        END) AS conversions,
        CAST(COUNT(DISTINCT CASE 
            WHEN ev.event_type = 'conversion' 
            THEN ev.user_id 
        END) AS FLOAT) / NULLIF(COUNT(DISTINCT ua.user_id), 0) AS conversion_rate,
        AVG(CASE 
            WHEN ev.event_type = 'conversion' 
            THEN ev.event_value 
        END) AS avg_value
    FROM experiments e
    JOIN variants v ON e.id = v.experiment_id
    LEFT JOIN user_assignments ua ON v.id = ua.variant_id
    LEFT JOIN experiment_events ev ON ua.user_id = ev.user_id 
        AND ua.experiment_id = ev.experiment_id
        AND ua.variant_id = ev.variant_id
    WHERE e.status IN ('running', 'completed')
    GROUP BY e.id, e.name, v.id, v.name, v.is_control
)
SELECT 
    experiment_id,
    experiment_name,
    variant_id,
    variant_name,
    is_control,
    total_users,
    conversions,
    ROUND(conversion_rate * 100, 2) AS conversion_rate_pct,
    ROUND(avg_value, 2) AS avg_conversion_value
FROM variant_metrics
ORDER BY experiment_id, is_control DESC, variant_name;
