import React from 'react';
const waves = () => {
    return (
        <div className="classes.Waves">
        <svg width="100%" height="170px" fill="none">
          <path 
            fill="#352e8a" 
            d="
              M0 67
              C 273,183
                822,-40
                1920.00,106 
              V 359 
              H 0 
              V 67
              Z">
            <animate 
              repeatCount="indefinite" 
              fill="#352e8a" 
              attributeName="d" 
              dur="7s" 
              values="
                M0 77 
                C 473,283
                  822,-40
                  1920,116 
    
                V 359 
                H 0 
                V 67 
                Z; 
    
                M0 77 
                C 473,-40
                  1222,283
                  1920,136 
    
                V 359 
                H 0 
                V 67 
                Z; 
    
                M0 77 
                C 973,260
                  1722,-53
                  1920,120 
    
                V 359 
                H 0 
                V 67 
                Z; 
    
                M0 77 
                C 473,283
                  822,-40
                  1920,116 
    
                V 359 
                H 0 
                V 67 
                Z
                ">
            </animate>
          </path>
        </svg>
      </div>
    
    )
}

export default waves
