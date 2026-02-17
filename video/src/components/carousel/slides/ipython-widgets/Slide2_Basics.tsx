import React from "react";
import { CarouselLayout } from "../../CarouselLayout";
import { CAROUSEL_COLORS } from "../../../../lib/constants";
import { FONTS } from "../../../../lib/fonts";

export const Slide2_Basics: React.FC = () => {
  const sidebarContent = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <h2
        style={{
          color: CAROUSEL_COLORS.textWhite,
          fontSize: 90,
          fontFamily: FONTS.display,
          fontWeight: 700,
          textTransform: "uppercase",
          margin: 0,
          lineHeight: 0.95,
        }}
      >
        THE
        <br />
        BASICS
      </h2>
    </div>
  );

  const widgets = [
    { name: "IntSlider / FloatSlider", desc: "Numeric value selection" },
    { name: "Dropdown / Select", desc: "Choose from options" },
    { name: "Text / Textarea", desc: "Text input fields" },
    { name: "Button", desc: "Trigger actions on click" },
    { name: "Checkbox / ToggleButton", desc: "Boolean toggles" },
    { name: "DatePicker", desc: "Date selection" },
    { name: "Output", desc: "Capture and display output" },
  ];

  return (
    <CarouselLayout
      showSidebar
      sidebarContent={sidebarContent}
      pageNumber="2/5"
    >
      {/* Title */}
      <h2
        style={{
          color: CAROUSEL_COLORS.bgRed,
          fontSize: 38,
          fontFamily: FONTS.display,
          fontWeight: 700,
          textTransform: "uppercase",
          margin: 0,
          marginBottom: 25,
          textAlign: "center",
        }}
      >
        AVAILABLE WIDGET TYPES
      </h2>

      {/* Description */}
      <p
        style={{
          color: CAROUSEL_COLORS.textBlack,
          fontSize: 18,
          fontFamily: FONTS.body,
          textAlign: "center",
          margin: 0,
          marginBottom: 25,
          lineHeight: 1.5,
        }}
      >
        ipywidgets provides interactive HTML controls for Jupyter notebooks.
        <br />
        Install with: <code style={{ fontFamily: FONTS.code }}>%pip install ipywidgets</code>
      </p>

      {/* Widget List */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          width: "100%",
        }}
      >
        {widgets.map((widget, idx) => (
          <div
            key={widget.name}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 16px",
              backgroundColor: idx % 2 === 0 ? "#F5F5F5" : "#FFFFFF",
              borderRadius: 8,
              borderLeft: `4px solid ${CAROUSEL_COLORS.bgRed}`,
            }}
          >
            <div>
              <span
                style={{
                  color: CAROUSEL_COLORS.codeMethod,
                  fontSize: 16,
                  fontFamily: FONTS.code,
                  fontWeight: 600,
                  display: "block",
                }}
              >
                {widget.name}
              </span>
              <span
                style={{
                  color: CAROUSEL_COLORS.textBlack,
                  fontSize: 14,
                  fontFamily: FONTS.body,
                }}
              >
                {widget.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </CarouselLayout>
  );
};
