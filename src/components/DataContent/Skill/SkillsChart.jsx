import React, { useState, useEffect } from "react";
import Section from "../../Section/Section";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-dark-cast text-black dark:text-white p-2 rounded">
        <p>{`${payload[0].name}: ${Math.round(payload[0].value)}%`}</p>
      </div>
    );
  }
  return null;
};

const SkillsChart = ({ skills }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, index }) => {
    if (windowWidth < 600) return null;

    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 24;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-sm fill-black dark:fill-white"
      >
        {`${skills[index].name} • ${Math.round(skills[index].level)}%`}
      </text>
    );
  };

  return (
    <div className="w-full h-[420px] no-tap-highlight">
      <ResponsiveContainer>
        <PieChart>
          <defs>
            <filter id="circleShadow" x="0" y="0" width="140%" height="140%">
              <feDropShadow
                dx="1"
                dy="1"
                stdDeviation="1"
                floodColor="rgba(0,0,0,0.2)"
              />
            </filter>
          </defs>

          <Legend
            payload={skills.map((skill) => ({
              value: skill.name,
              type: "circle",
              color: skill.color,
              id: `legend-${skill.name}`,
            }))}
            formatter={(value, entry) => (
              <span style={{ filter: "url(#circleShadow)" }}>{value}</span>
            )}
          />

          <Pie
            data={skills}
            dataKey="level"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            labelLine={windowWidth >= 600}
            label={renderCustomLabel}
            stroke="transparent"
            isAnimationActive={false}
            activeShape={{ stroke: "none" }}
          >
            {skills.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            payload={skills.map((skill) => ({
              value: skill.name,
              type: "circle",
              color: skill.color,
            }))}
            wrapperStyle={{
              filter: "url(#legendShadow)",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "6px",
              padding: "10px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
const SkillsSection = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(
          "http://localhost/portfolio/api/skills.php"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Response is not JSON");
        }

        const data = await response.json();
        setSkills(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const normalizeSkills = (skills) => {
    if (!skills || skills.length === 0) return [];

    const total = skills.reduce((sum, skill) => sum + skill.level, 0);
    return skills.map((skill) => ({
      ...skill,
      level: (skill.level / total) * 100,
    }));
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!skills || skills.length === 0)
    return <div className="text-white">No skills data available</div>;

  const normalizedSkills = normalizeSkills(skills);

  return (
    <Section id="skills" title="Навыки и стек">
      <SkillsChart skills={normalizedSkills} />
      <div className="flex flex-col text-black dark:text-white gap-5 mt-5">
        {["technology", "tool"].map((category) => (
          <div key={category}>
            <h3
              className={`font-normal ${
                category === "technology" ? "mt-5" : "mt-8"
              }`}
            >
              - {category === "technology" ? "Технологии:" : "Инструменты:"}
            </h3>
            <div className="mt-5 space-y-5">
              {skills
                .filter((skill) => skill.category === category)
                .map((skill) => (
                  <div className="w-full" key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={skill.icon}
                          alt={`${skill.name} logo`}
                          className="w-6 h-6 object-contain"
                          draggable="false"
                          onDragStart={(e) => e.preventDefault()}
                        />
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="font-medium">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5  bg-slate-300 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300 ease-in-out"
                        style={{
                          width: `${skill.level}%`,
                          backgroundColor: skill.color,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default SkillsSection;
