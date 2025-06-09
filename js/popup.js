document.addEventListener("DOMContentLoaded", () => {
    const startVideoButton = document.querySelector("button#start_video");
    const stopVideoButton = document.querySelector("button#stop_video");
    
    // Function to get the active tab
    async function getActiveTab() {
      const tabs = await chrome.tabs.query({active: true, currentWindow: true});
      return tabs[0];
    }
    
    // Function to check if we can inject into this tab
    function canInjectIntoTab(tab) {
      // Cannot inject into chrome:// or edge:// pages
      return !tab.url.startsWith("chrome://") && 
             !tab.url.startsWith("edge://") && 
             !tab.url.startsWith("about:") &&
             !tab.url.startsWith("chrome-extension://") &&
             !tab.url.startsWith("edge-extension://");
    }
    
    // Add event listeners
    startVideoButton.addEventListener("click", async () => {
      console.log("Start button clicked");
      const tab = await getActiveTab();
      if (tab && canInjectIntoTab(tab)) {
        try {
          // First ensure content script is loaded
          try {
            await chrome.scripting.executeScript({
              target: {tabId: tab.id},
              files: ["content.js"]
            });
          } catch (err) {
            // Ignore if content script is already loaded
            console.log("Content script may already be loaded");
          }
          
          // Then send message
          chrome.tabs.sendMessage(
            tab.id, 
            {action: "request_recording"}, 
            (response) => {
              console.log("Response from content script:", response);
              if (chrome.runtime.lastError) {
                console.error("Error sending message:", chrome.runtime.lastError.message || "Unknown error");
              }
            }
          );
        } catch (error) {
          console.error("Error sending message:", error);
        }
      } else {
        console.error("Cannot inject into this page. Try opening a regular webpage.");
        alert("Screen recording cannot be started on this page. Please navigate to a regular webpage first.");
      }
    });
    
    stopVideoButton.addEventListener("click", async () => {
      console.log("Stop button clicked");
      const tab = await getActiveTab();
      if (tab && canInjectIntoTab(tab)) {
        try {
          chrome.tabs.sendMessage(
            tab.id, 
            {action: "stopvideo"}, 
            (response) => {
              console.log("Response from content script:", response);
              if (chrome.runtime.lastError) {
                console.error("Error sending message:", chrome.runtime.lastError.message || "Unknown error");
              }
            }
          );
        } catch (error) {
          console.error("Error sending message:", error);
        }
      }
    });
  });