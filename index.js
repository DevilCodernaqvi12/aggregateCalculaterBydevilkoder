		const weights = { matric: 0.10, fsc: 0.40, test: 0.50 };
		const form = document.getElementById('aggregateForm');
		const progressBar = document.getElementById('progressBar');
		const progressBarInner = document.getElementById('progressBarInner');
		const resultCard = document.getElementById('resultCard');
		const resultPercentage = document.getElementById('resultPercentage');
		const resultBreakdown = document.getElementById('resultBreakdown');
		form.addEventListener('submit', function(e) {
			e.preventDefault();
			// Hide result, show progress bar
			resultCard.style.display = 'none';
			progressBar.style.display = 'block';
			progressBarInner.style.width = '0';
			setTimeout(() => {
				progressBarInner.style.width = '100%';
			}, 100);
			setTimeout(() => {
				// Get values
				const matricObtained = parseFloat(document.getElementById('matricObtained').value);
				const matricTotal = parseFloat(document.getElementById('matricTotal').value);
				const fscObtained = parseFloat(document.getElementById('fscObtained').value);
				const fscTotal = parseFloat(document.getElementById('fscTotal').value);
				const testObtained = parseFloat(document.getElementById('testObtained').value);
				const testTotal = parseFloat(document.getElementById('testTotal').value);
				if (
					isNaN(matricObtained) || isNaN(matricTotal) || matricTotal <= 0 ||
					isNaN(fscObtained) || isNaN(fscTotal) || fscTotal <= 0 ||
					isNaN(testObtained) || isNaN(testTotal) || testTotal <= 0
				) {
					alert('Please enter valid obtained and total marks for all fields.');
					progressBar.style.display = 'none';
					return;
				}
				// Calculate percentages
				const matricPerc = (matricObtained / matricTotal) * 100;
				const fscPerc = (fscObtained / fscTotal) * 100;
				const testPerc = (testObtained / testTotal) * 100;
				// Weighted marks
				const matricWeighted = matricPerc * weights.matric;
				const fscWeighted = fscPerc * weights.fsc;
				const testWeighted = testPerc * weights.test;
				const aggregate = matricWeighted + fscWeighted + testWeighted;
				// Show result
				resultPercentage.textContent = `Aapka aggregate: ${aggregate.toFixed(1)}%`;
				resultBreakdown.innerHTML = `Matric weight: 10% → ${matricWeighted.toFixed(1)} marks<br>
					FSC weight: 40% → ${fscWeighted.toFixed(1)} marks<br>
					Test weight: 50% → ${testWeighted.toFixed(1)} marks`;
				progressBar.style.display = 'none';
				resultCard.style.display = 'flex';
			}, 1400);
		});
		// Download PDF (basic)
		document.getElementById('downloadPdfBtn').onclick = function() {
			window.print();
		};
		// Share on WhatsApp
		document.getElementById('shareWhatsappBtn').onclick = function() {
			const text = resultPercentage.textContent + '\n' + resultBreakdown.textContent;
			const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
			window.open(url, '_blank');
		};