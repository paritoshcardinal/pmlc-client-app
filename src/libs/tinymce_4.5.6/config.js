{
  "buttonBar": [
    {
      "klass": "EquationEditor.Buttons.WriteButtonView",
      "latex": "+"
    },
    {
      "klass": "EquationEditor.Buttons.WriteButtonView",
      "latex": "-"
    },
    {
      "klass": "EquationEditor.Buttons.WriteButtonView",
      "latex": "\\times"
    },
    {
      "klass": "EquationEditor.Buttons.WriteButtonView",
      "latex": "\\div"
    },
    {
      "klass": "EquationEditor.Buttons.CommandButtonView",
      "latex": "/",
      "buttonText": "x/y"
    },
    {
      "klass": "EquationEditor.Buttons.CommandButtonView",
      "latex": "^",
      "buttonText": "y^x",
      "className": "tall"
    },
    {
      "klass": "EquationEditor.Buttons.CommandButtonView",
      "latex": "\\sqrt",
      "buttonText": "\\sqrt{x}",
      "className": "sqrt-button"
    },
    {
      "klass": "EquationEditor.Buttons.WriteButtonView",
      "latex": "="
    },
    {
      "klass": "EquationEditor.Buttons.WriteButtonView",
      "latex": "\\approx"
    }
  ],
  "buttonGroups": {
    "basic": [
      {
          "groupName": "Math Symbols",
          "buttonViews": [
            {
                "klass": "EquationEditor.Buttons.WriteButtonView",
                "latex": "+",
                "tooltipDir" : "right",
                "tooltipText" : "plus sign"
            },
            {
                "klass": "EquationEditor.Buttons.WriteButtonView",
                "latex": "-",
                "tooltipDir" : "bottom",
                "tooltipText" : "minus sign"
            },
            {
                "klass": "EquationEditor.Buttons.WriteButtonView",
                "latex": "\\times",
                "tooltipDir" : "bottom",
                "tooltipText" : "times sign"
            },
            {
                "klass": "EquationEditor.Buttons.WriteButtonView",
                "latex": "\\div",
                "tooltipDir" : "left",
                "tooltipText" : "division sign"
            },
            {
                "klass": "EquationEditor.Buttons.WriteButtonView",
                "latex": "\\pm",
                "tooltipDir" : "right",
                "tooltipText" : "plus-minus sign"
            },
            {
                "klass": "EquationEditor.Buttons.CommandButtonView",
                "latex": "<sup class='ngtv'>−</sup>",
                "tooltipDir" : "bottom",
                "buttonText": "&#1470;",
                "tooltipText" : "negative sign"
            },
            {
                "klass": "EquationEditor.Buttons.WriteButtonView",
                "latex": "\\cdot",
                "tooltipDir" : "bottom",
                "tooltipText" : "times dot"
            },
            {
                "klass": "EquationEditor.Buttons.CommandButtonView",
                "latex": "/",
                "tooltipDir" : "left",
                "tooltipText" : "division slash"
            },
            {
                "klass": "EquationEditor.Buttons.CommandButtonView",
                "latex": "=",
                "tooltipDir" : "right",
                "tooltipText" : "equal"
            },
            {
                "klass": "EquationEditor.Buttons.WriteButtonView",
                "latex": "\\neq",
                "tooltipDir" : "bottom",
                "tooltipText" : "not equal"
            },
            {
                "klass": "EquationEditor.Buttons.CommandButtonView",
                "latex": "/",
                "buttonText": "&#x00e005;",
                "tooltipDir" : "bottom",
                "tooltipText" : "fraction"
            },
            {
                "klass": "EquationEditor.Buttons.WriteButtonView",
                "latex": "{x}\\frac{y}{z}",
                "buttonText": "&#x00e006;",
                "tooltipDir" : "left",
                "tooltipText" : "mixed number"
            },
            {
                "klass": "EquationEditor.Buttons.CommandButtonView",
                "latex": "^",
                "buttonText": "y^x",
                "className": "tall",
                "tooltipDir" : "right",
                "tooltipText" : "power"
            },
            {
                "klass": "EquationEditor.Buttons.CommandButtonView",
                "latex": "_",
                "buttonText": "y_x",
                "className": "tall",
                "tooltipDir" : "right",
                "tooltipText" : "subscript"
            },
            {
                "klass": "EquationEditor.Buttons.CommandButtonView",
                "latex": "\\sqrt",
                "buttonText": "&#x00e002;",
                "tooltipDir" : "bottom",
                "tooltipText" : "square root"
          },
          {
            "klass": "EquationEditor.Buttons.CommandButtonView",
            "latex": "\\thirdroot",
            "buttonText": "&#x00e003;",
            "className": "sqrt-button tall",
            "tooltipDir" : "left",
            "tooltipText" : "cube root"
          },
          {
            "klass": "EquationEditor.Buttons.WriteButtonView",
            "latex": "\\pi",
            "tooltipDir" : "right",
            "tooltipText" : "constant pi"
          },
          {
            "klass": "EquationEditor.Buttons.CommandButtonView",
            "latex": "(",
            "buttonText": "(\\cdot)",
            "tooltipDir" : "top",
            "tooltipText" : "parenthesis"
          },
          {
            "klass": "EquationEditor.Buttons.WriteButtonView",
            "latex": "\\degree",
            "tooltipDir" : "top",
            "tooltipText" : "degree sign"
          },
          {
            "klass": "EquationEditor.Buttons.CommandButtonView",
            "latex": "|",
            "buttonText": "|\\cdot|",
            "tooltipDir" : "left",
            "tooltipText" : "absolute value"
          }
        ]
      }
    ],
    "intermediate": [
      
      {
        "groupName": "Relations",
        "buttonViews": [
          {
            "klass": "EquationEditor.Buttons.WriteButtonView",
            "latex": "=",
            "tooltipDir" : "right",
            "tooltipText" : "equal"
          },
          {
            "klass": "EquationEditor.Buttons.WriteButtonView",
            "latex": "\\neq",
            "tooltipDir" : "bottom",
            "tooltipText" : "not equal"
          },
          {
            "klass": "EquationEditor.Buttons.WriteButtonView",
            "latex": "\\sim",
            "tooltipDir" : "bottom",
            "tooltipText" : "similar"
          },
          {
            "klass": "EquationEditor.Buttons.WriteButtonView",
            "latex": "≁",
            "tooltipDir" : "left",
            "buttonText":"≁",
            "tooltipText" : "not similar"
          },
          {
            "klass": "EquationEditor.Buttons.WriteButtonView",
            "latex": "\\lt",
            "tooltipDir" : "right",
            "tooltipText" : "less than"
          },
          {
            "klass": "EquationEditor.Buttons.WriteButtonView",
            "latex": "\\gt",
            "tooltipDir" : "bottom",
            "tooltipText" : "greater than"
          },
          {
            "klass": "EquationEditor.Buttons.WriteButtonView",
            "latex": "\\approx",
            "tooltipDir" : "bottom",
            "tooltipText" : "approximately equal"
          },
          {
            "klass": "EquationEditor.Buttons.WriteButtonView",
            "latex": "≉",
            "tooltipDir" : "left",
            "buttonText":"≉",
            "tooltipText" : "not approximately equal"
          },
          {
            "klass": "EquationEditor.Buttons.WriteButtonView",
            "latex": "\\le",
            "tooltipDir" : "right",
            "tooltipText" : "less than or equal"
          },
          {
            "klass": "EquationEditor.Buttons.WriteButtonView",
            "latex": "\\ge",
            "tooltipDir" : "bottom",
            "tooltipText" : "greater than or equal"
          },
          {
            "klass": "EquationEditor.Buttons.WriteButtonView",
            "latex": "\\cong",
            "tooltipDir" : "bottom",
            "tooltipText" : "congruent"
          },
          {
            "klass": "EquationEditor.Buttons.WriteButtonView",
            "latex": "≇",
            "tooltipDir" : "left",
            "buttonText": "≇",
            "tooltipText" : "not congruent"
          }
        ]
      },
      {
        "groupName": "Geometry",
        "buttonViews": [
          {
           "klass": "EquationEditor.Buttons.CommandButtonView",
           "latex": "\\vec",
            "tooltipDir" : "right",
            "tooltipText" : "ray",
            "buttonText":"→"
          },
          {
            "klass": "EquationEditor.Buttons.CommandButtonView",
            "latex": "\\line",
            "tooltipDir" : "bottom",
            "tooltipText" : "line",
            "buttonText":"↔"
},
          {
            "klass": "EquationEditor.Buttons.CommandButtonView",
            "latex": "\\overline",
            "buttonText": "\\overline{AB}",
            "tooltipDir" : "bottom",
            "tooltipText" : "line segment"
          },
          {
            "klass": "EquationEditor.Buttons.WriteButtonView",
            "latex": "\\parallel",
            "tooltipDir" : "left",
            "tooltipText" : "parallel"
          },
          {
            "klass": "EquationEditor.Buttons.WriteButtonView",
            "latex": "\\perp",
            "tooltipDir" : "right",
            "tooltipText" : "perpendicular"
          },
          {
            "klass": "EquationEditor.Buttons.WriteButtonView",
            "latex": "\\angle",
            "tooltipDir" : "bottom",
            "tooltipText" : "angle"
          },
          {
            "klass": "EquationEditor.Buttons.WriteButtonView",
            "latex": "m\\angle",
            "tooltipDir" : "bottom",
            "tooltipText" : "angle measure",
            "className": "mAngle"
          },
          {
            "klass": "EquationEditor.Buttons.WriteButtonView",
            "latex": "\\bigtriangleup",
            "tooltipDir" : "left",
            "tooltipText" : "triangle"
          },
          {
            "klass": "EquationEditor.Buttons.WriteButtonView",
            "latex": "▱",
            "tooltipDir" : "right",
            "tooltipText" : "parallelogram"
          },
          {
            "klass": "EquationEditor.Buttons.WriteButtonView",
            "latex": "\\bigodot",
            "tooltipDir" : "right",
            "tooltipText" : "circle"
          }
        ]
      }
    ],
    "advanced": []
  }
}
