// CSV 파일 경로
const csvFilePath = 'data.csv';

// SVG 차트 크기 설정
const width = 600;
const height = 400;

// SVG 요소 생성
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// 데이터를 읽어와 그래프 그리기
d3.csv(csvFilePath)
    .then(function(data) {
        // 데이터 파싱
        data.forEach(function(d) {
            d.year = +d.year; // 연도를 숫자로 변환
            d.price = +d.price; // 가격을 숫자로 변환
        });

        // 스케일 설정
        const xScale = d3.scaleLinear()
            .domain([d3.min(data, d => d.year), d3.max(data, d => d.year)])
            .range([50, width - 50]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.price)])
            .range([height - 50, 20]);

        // 선 생성
        const line = d3.line()
            .x(d => xScale(d.year))
            .y(d => yScale(d.price));

        // 선 그리기
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", line);

        // X 축 생성
        svg.append("g")
            .attr("transform", `translate(0, ${height - 50})`)
            .call(d3.axisBottom(xScale).ticks(5).tickFormat(d3.format("d")));

        // Y 축 생성
        svg.append("g")
            .attr("transform", "translate(50,0)")
            .call(d3.axisLeft(yScale).ticks(5));

        // 그래프 제목
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", 20)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .text("연도별 라면 가격");

    })
    .catch(function(error) {
        console.log(error);
    });