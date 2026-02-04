---
layout: page
title: AI Agent Tools
description: Multi-tool AI agent with web search and research capabilities
img: assets/img/projects/ai-agent-tool-cover2.png
importance: 8
category: work
github: https://github.com/ctheara/ai-agent-tools
---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/ai-agent-tool-cover2.png" title="ai-agent-tools" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

An AI research assistant that autonomously uses multiple tools to gather information, combining web search, Wikipedia lookups, and file operations. This gave me exposure to `LangChain`, `AI agents` and `tools` implementation.

<br>

## Tech Stack

- **AI Framework:** `LangChain`
- **LLM:** `OpenAI GPT-4o-mini`
- **Tools:** DuckDuckGo Search, Wikipedia API, File I/O, Dad Jokes API
- **Output Parsing:** `Pydantic` for structured responses
- **Language:** `Python 3.8+`

<br>

## Architecture

```
User Query
    │
    ▼
┌─────────────────────┐
│   LangChain Agent   │
│   (GPT-4o-mini)     │
└──────────┬──────────┘
           │
           │ (decides which tools to use)
           │
    ┌──────┴──────┬──────────┬──────────┐
    ▼             ▼          ▼          ▼
┌────────┐  ┌─────────┐  ┌──────┐  ┌──────┐
│ Search │  │  Wiki   │  │ Save │  │ Joke │
│  Tool  │  │  Tool   │  │ Tool │  │ Tool │
└────────┘  └─────────┘  └──────┘  └──────┘
    │             │          │          │
    └─────────────┴──────────┴──────────┘
                  │
                  ▼
        ┌──────────────────┐
        │ Structured Output│
        │   (Pydantic)     │
        └──────────────────┘
```

<br>

## Key Features & Implementation

1. **Autonomous Tool Calling** - `LangChain` agent autonomously decides which tools to invoke based on user query, demonstrating AI reasoning capabilities.
2. **Web Search Integration** - DuckDuckGo tool fetches current information from the web for queries requiring real-time data.
3. **Knowledge Retrieval** - Wikipedia API wrapper provides structured lookups with configurable result limits and character constraints.
4. **Structured Output** - `Pydantic` schema enforces consistent response format with topic, summary, sources, and tools used.
5. **File Operations** - Custom tool saves research outputs to timestamped text files with automatic filename handling.
6. **Dad Jokes Tool** - Implemented a custom tool that called an external API to get dad jokes.

<br>

## Tool Implementation

**Custom Get Dad Jokes Tool:**
```python
def get_dad_joke(input_text: str = "") -> str:
    url = "https://icanhazdadjoke.com/"
    headers = {"Accept": "application/json"}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        joke = response.json().get("joke", "No joke found.")
        return joke
    else:
        return "Failed to fetch a joke."

dad_joke_tool = Tool(
    name="get_dad_joke",
    func=get_dad_joke,
    description="Returns a random dad joke from the API. Input can be any string (not used)."
)
```

**Agent Configuration:**
```python
llm = ChatOpenAI(model="gpt-4o-mini")
tools = [search_tool, wiki_tool, save_tool, dad_joke_tool]
agent = create_tool_calling_agent(llm=llm, prompt=prompt, tools=tools)
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)
```

<br>

## Output Schema

The agent returns structured data using Pydantic:

```python
class ResearchResponse(BaseModel):
    topic: str
    summary: str
    sources: list[str]
    tools_used: list[str]
    dad_joke: str  # Optional
```

**Example Output:**
```json
{
  "topic": "Recent AI developments",
  "summary": "Latest advancements in large language models...",
  "sources": ["https://example.com/ai-news", "Wikipedia: Artificial Intelligence"],
  "tools_used": ["search", "wiki_tool", "save_to_txt_file"],
  "dad_joke": ""
}
```

<br>

## Learnings

1. **New Technologies:** `LangChain`, `OpenAI API`, AI agent orchestration
2. **Agent Design:** Understanding when agents should use tools vs. relying on base knowledge
3. **Structured Output:** Using `Pydantic` for type-safe, predictable AI responses
4. **Tool Integration:** Creating custom tools that called an external API get data jokes. It integrated seamlessly with LangChain framework

<br>

## Demo

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <a href="https://www.loom.com/share/f9e0152e67de40aeaf99886c8d6e3a11?sid=25267f4d-40ed-4824-b257-abb78f8ab179" target="_blank">
            {% include figure.liquid loading="eager" path="assets/img/projects/ai-agent-tool-thumbnail.png" title="ai-agent-tools" class="img-fluid rounded z-depth-1" %}
        </a>
    </div>
</div>
<div class="caption">
    Click to watch demo video showing the agent in action
</div>

<br>

## Links

- **GitHub Repository:** [ctheara/ai-agent-tools](https://github.com/ctheara/ai-agent-tools)
- **Demo Video:** [Watch on Loom](https://www.loom.com/share/f9e0152e67de40aeaf99886c8d6e3a11?sid=25267f4d-40ed-4824-b257-abb78f8ab179)

---

**Technologies:** `Python` · `LangChain` · `OpenAI` · `GPT-4o-mini` · `Pydantic` · `DuckDuckGo API` · `Wikipedia API` · `AI Agents`
